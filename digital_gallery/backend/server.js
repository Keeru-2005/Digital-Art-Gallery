const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();

// Middleware to handle cross-origin requests
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/artgallery', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

// Define User Schema for authentication
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model('User', userSchema);

// Define the schema for the painting
const imageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: String, required: true }, // Price is now a number
  imageData: { type: String, required: true }, // Base64 encoded image data
});

const Image = mongoose.model('Image', imageSchema);

// Register route
app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err });
  }
});

// Middleware to authenticate JWT token
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from header

  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, 'secret_key');
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token', error: err });
  }
};

// API route to fetch all paintings with pagination and filtering
app.get('/api/paintings', async (req, res) => {
  const { page = 1, limit = 25, category, minPrice, maxPrice } = req.query;

  try {
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (minPrice && maxPrice) {
      filter.price = { $gte: minPrice, $lte: maxPrice };
    }

    const paintings = await Image.find(filter)
      .skip((pageNumber - 1) * limitNumber) // Pagination
      .limit(limitNumber);

    const totalCount = await Image.countDocuments(filter);

    res.json({
      paintings,
      totalCount,
      totalPages: Math.ceil(totalCount / limitNumber),
      currentPage: pageNumber,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching paintings', error });
  }
});

// API route to fetch a single painting by ID
app.get('/api/paintings/:paintingId', async (req, res) => {
  const paintingId = req.params.paintingId;  // Get painting ID from the URL

  try {
    // Find painting by ID
    const painting = await Image.findById(paintingId);

    if (painting) {
      res.json(painting);  // Return the painting data as JSON
    } else {
      res.status(404).json({ message: 'Painting not found' });
    }
  } catch (err) {
    console.error('Error fetching painting:', err);
    res.status(500).json({ message: 'Error fetching painting', error: err });
  }
});

// API route to add a new painting (authentication required)
app.post('/api/paintings', authenticate, async (req, res) => {
  const { title, description, category, price, imageData } = req.body;

  try {
    const newPainting = new Image({ title, description, category, price, imageData });
    await newPainting.save();
    res.status(201).json({ message: 'Painting added successfully', painting: newPainting });
  } catch (err) {
    res.status(500).json({ message: 'Error adding painting', error: err });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
