// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware to handle cross-origin requests
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // For serving images


//user login and signup
const {userLogin} = require("./controllers/user_control")
const {userSignup} = require("./controllers/user_control")

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/artgallery', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

// Define the schema for paintings
const imageSchema = new mongoose.Schema({
  title: String,
  artist: String,   
  movement: String,
  description: String,
  category: String,
  price: String, // Price field for painting
  imageData: String, // Base64 encoded image data
});

const Image = mongoose.model('Image', imageSchema);

// Define the schema for cart
const cartSchema = new mongoose.Schema({
  userId: String,  // You can store the user ID here (if users are authenticated)
  items: [
    {
      paintingId: mongoose.Schema.Types.ObjectId,
      quantity: { type: Number, default: 1 },
    },
  ],
});

const Cart = mongoose.model('Cart', cartSchema);

// Fetch paintings based on title
app.get('/api/paintings', async (req, res) => {
  const { page = 1, limit = 28, title } = req.query;

  try {
    const filter = {};
    if (title) {
      filter.title = { $regex: title, $options: 'i' };
    }

    const skip = (page - 1) * limit;
    const totalPaintings = await Image.countDocuments(filter);
    const totalPages = Math.ceil(totalPaintings / limit);

    const paintings = await Image.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .exec();

    res.json({ paintings, totalPages });
  } catch (error) {
    console.error('Error fetching paintings:', error);
    res.status(500).json({ message: 'Error fetching paintings' });
  }
});


// Add item to cart
app.post('/api/cart/add', async (req, res) => {
  const { userId, paintingId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (cart) {
      // If painting is already in the cart, increase the quantity
      const existingItemIndex = cart.items.findIndex(item => item.paintingId.equals(paintingId));
      if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity += 1;
      } else {
        cart.items.push({ paintingId, quantity: 1 });
      }
      await cart.save();
    } else {
      // If cart does not exist, create a new one
      const newCart = new Cart({ userId, items: [{ paintingId, quantity: 1 }] });
      await newCart.save();
    }

    res.status(200).json({ message: 'Item added to cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding item to cart' });
  }
});

// Fetch items in cart
app.get('/api/cart', async (req, res) => {
  const { userId } = req.query;

  try {
    const cart = await Cart.findOne({ userId }).populate('items.paintingId');  // Populate item data
    res.json({ cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching cart' });
  }
});

app.post("/api/signup",userSignup);
app.post("/api/login",userLogin);
//app.post("api/image",uploadImagesFromCSV)

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});