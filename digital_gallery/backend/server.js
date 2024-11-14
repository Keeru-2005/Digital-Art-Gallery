const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
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

// Define the schema for the painting
const imageSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  price: Number, // Add price field
  imageData: String, // Base64 encoded image data
});

const Image = mongoose.model('Image', imageSchema);

// API route to fetch paintings with pagination and filtering
app.get('/api/paintings', async (req, res) => {
  const { page = 1, limit = 25, category, minPrice, maxPrice } = req.query;

  try {
    // Convert the page and limit to numbers
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    const filter = {};

    // Apply category filter if provided
    if (category) {
      filter.category = category;
    }

    // Apply price filter if provided
    if (minPrice && maxPrice) {
      filter.price = { $gte: minPrice, $lte: maxPrice };
    }

    // Fetch the paintings with filters, pagination
    const paintings = await Image.find(filter)
      .skip((pageNumber - 1) * limitNumber) // Pagination
      .limit(limitNumber);

    const totalCount = await Image.countDocuments(filter); // Get total count for pagination

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

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
