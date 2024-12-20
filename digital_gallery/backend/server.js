const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const csvParser = require('csv-parser');

const path = require('path'); // Make sure to require path

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));  // <-- This is the important change
app.use('/uploads', express.static('uploads')); // For serving images

// User login and signup
const { userLogin } = require("./controllers/user_control");
const { userSignup } = require("./controllers/user_control");
const cartController = require('./controllers/cart_control');

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/artgallery', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

// Define schema and model for Paintings
const paintingSchema = new mongoose.Schema({
  title: String,
  artist: String,
  movement: String,
  description: String,
  condition: String,
  yearCreation: String,
  price: String,
  imageData: String,
});

const Painting = mongoose.model('Painting', paintingSchema);

// Define schema and model for Photography
const photographySchema = new mongoose.Schema({
  title: String,
  price: String,
  date: String,
  copyright: String,
  explanation: String,
  imageData: String,
});

const Photography = mongoose.model('Photography', photographySchema);

// Common function to handle pagination and filtering
async function fetchPaginatedData(Model, filters, page, limit) {
  const pageNumber = parseInt(page) || 1;
  const limitNumber = parseInt(limit) || 25;

  const results = await Model.find(filters)
    .skip((pageNumber - 1) * limitNumber)
    .limit(limitNumber);

  const totalCount = await Model.countDocuments(filters);

  return {
    data: results,
    totalCount,
    totalPages: Math.ceil(totalCount / limitNumber),
    currentPage: pageNumber,
  };
}

// Fetch paintings based on title
app.get('/api/paintings', async (req, res) => {
  const { search, page = 1, limit = 25 } = req.query;

  // console.log('Received search query for paintings:', search); // Debugging line

  try {
    const filters = {};

    if (search) {
      // Search in title, artist, or movement
      const searchRegex = new RegExp(search, 'i'); // 'i' for case-insensitive search
      filters.$or = [
        { title: { $regex: searchRegex } },
        { artist: { $regex: searchRegex } },
        { movement: { $regex: searchRegex } }
      ];
    }

    const data = await fetchPaginatedData(Painting, filters, page, limit);
    res.json({
      paintings: data.data,
      totalCount: data.totalCount,
      totalPages: data.totalPages,
      currentPage: data.currentPage,
    });
  } catch (error) {
    console.error('Error fetching paintings:', error);
    res.status(500).json({ message: 'Error fetching paintings' });
  }
});



// Fetch photographies
app.get('/api/photographies', async (req, res) => {
  const { search, page = 1, limit = 25 } = req.query;

  // console.log('Received search query for photographs:', search); 

  try {
    const filters = {};

    if (search) {
      // Search in title or copyright
      const searchRegex = new RegExp(search, 'i'); // 'i' for case-insensitive search
      filters.$or = [
        { title: { $regex: searchRegex } },
        { copyright: { $regex: searchRegex } }
      ];
    }

    const data = await fetchPaginatedData(Photography, filters, page, limit);
    res.json({
      photographyImages: data.data,
      totalPages: data.totalPages,
    });
  } catch (error) {
    console.error('Error fetching photographies:', error);
    res.status(500).json({ error: 'Error fetching photographies' });
  }
});





// CSV Import Endpoint to update artist names
app.get('/import-artists', (req, res) => {
  const csvFilePath = path.join(__dirname, 'backend', 'artDataset.csv'); // Correct cross-platform path

  fs.createReadStream(csvFilePath)
    .pipe(csvParser())
    .on('data', async (row) => {
      try {
        await Painting.updateOne(
          { _id: mongoose.Types.ObjectId(row._id) }, // Match by _id
          { $set: { artist: row.artist } } // Update the artist field
        );
        console.log(`Updated painting ${row._id} with artist: ${row.artist}`);
      } catch (err) {
        console.error(`Error updating painting ${row._id}:, err`);
      }
    })
    .on('end', () => {
      console.log('CSV data successfully imported!');
      res.send('Artists updated successfully!');
    })
    .on('error', (err) => {
      console.error('Error during CSV import:', err);
      res.status(500).send('Error importing artists');
    });
});


// Define schema and model for Cart
// Define schema and model for Cart
const cartSchema = new mongoose.Schema({
  userId: String, // To associate the cart with a specific user
  paintings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Painting' }],
});

// Check if the model already exists before defining it
const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);

// POST route to add painting to cart
app.post('/api/cart/add', async (req, res) => {
  const { userId, paintingId } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // If no cart exists, create a new one
      cart = new Cart({
        userId,
        paintings: [paintingId],
      });
    } else {
      // If cart exists, add the paintingId
      cart.paintings.push(paintingId);
    }

    await cart.save();
    res.status(200).json({ message: 'Painting added to cart successfully' });
  } catch (error) {
    console.error('Error adding painting to cart:', error);
    res.status(500).json({ message: 'Error adding painting to cart' });
  }
});

app.post('/api/cart', async (req, res) => {
  const { title, artist, yearCreation, price, movement, condition, imageData } = req.body;

  try {
      // Create new Cart item without requiring userId
      const cartItem = new Cart({
          title,
          artist,
          yearCreation,
          price,
          movement,
          condition,
          imageData,
      });

      // Save the new cart item
      await cartItem.save();
      res.status(200).json({ message: 'Painting added to cart successfully!', cartItem });
  } catch (error) {
      console.error('Error adding painting to cart:', error);
      res.status(500).json({ message: 'There was an error adding the painting to the cart.' });
  }
});


app.get('/api/cart/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
      const cart = await Cart.findOne({ userId }).populate('paintings');

      if (!cart) {
          return res.status(404).json({ message: 'Cart not found' });
      }

      res.status(200).json(cart);
  } catch (error) {
      console.error('Error fetching cart:', error);
      res.status(500).json({ message: 'Error fetching cart' });
  }
});

// Assuming you're using Express.js
app.get('/api/cart', async (req, res) => {
  try {
      const cartItems = await Cart.find(); // Assuming Cart is your MongoDB model
      res.json({ cartItems });
  } catch (error) {
      console.error('Error fetching cart items:', error);
      res.status(500).send('Server error');
  }
});

// Route to remove painting from the cart (optional)
app.post('/api/remove', cartController.removeFromCart);

// User routes
app.post("/api/signup", userSignup);
app.post("/api/login", userLogin);

app.post('/api/clear-cart', cartController.clearCart);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
