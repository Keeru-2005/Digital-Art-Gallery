// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
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
  description: String,
  condition: String,
  yearCreation:String,
  artist:String,
  movement:String,
  price: String,
  imageData: String,
});

const Painting = mongoose.model('Painting', paintingSchema);

// Define schema and model for Photography
const photographySchema = new mongoose.Schema({
  title: String,
  
  price: String,
  date:String,
  copyright:String,
  explanation:String,
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

// API route to fetch paintings with pagination and filtering
app.get('/api/paintings', async (req, res) => {
  const { page = 1, limit = 25, yearCreation, movement, minPrice, maxPrice } = req.query;

  try {
    const filters = {};
    if (yearCreation) filters.yearCreation = yearCreation;
    if(movement) filters.movement=movement;
    if (minPrice && maxPrice) filters.price = { $gte: minPrice, $lte: maxPrice };

    const data = await fetchPaginatedData(Painting, filters, page, limit);

    res.json({
      paintings: data.data,
      totalCount: data.totalCount,
      totalPages: data.totalPages,
      currentPage: data.currentPage,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching paintings', error });
  }
});

app.get('/api/photographies', async (req, res) => {
  try {
      const { page = 1, limit = 28 } = req.query;
      const skip = (page - 1) * limit;

      // Fetch photographies with pagination
      const photographies = await Photography.find({})
          .skip(skip)
          .limit(parseInt(limit))
          .select('_id title imageData copyright price explanation'); // Explicitly include _id

      // Total count for pagination
      const totalCount = await Photography.countDocuments();

      res.json({
          photographyImages: photographies,
          totalPages: Math.ceil(totalCount / limit),
      });
  } catch (error) {
      console.error('Error fetching photographies:', error);
      res.status(500).json({ error: 'Server error' });
  }
});



// app.get('/api/photographies', async (req, res) => {
//   const { page = 1} = req.query; // Accept category but don't enforce it
//   const limit=28;
//   try {
//     // Ignore 'category' since it doesn't exist in your DB
//     const images = await Photography.find()
//       .skip((page - 1) * limit)
//       .limit(limit);
//     const totalCount = await Photography.countDocuments();

//     res.json({
//       photographyImages: images,
//       totalPages: Math.ceil(totalCount / limit),
//     });
//   } catch (err) {
//     console.error('Error fetching data:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });



// // API route to fetch photography images with pagination and filtering
// app.get('/api/photographies', async (req, res) => {
//   const { page = 1, limit = 28, minPrice, maxPrice } = req.query;

//   try {
//     const filters = {};
//     //if (category) filters.category = category;
//     if (minPrice && maxPrice) filters.price = { $gte: minPrice, $lte: maxPrice };

//     const data = await fetchPaginatedData(Photography, filters, page, limit);

//     res.json({
//       photographyImages: data.data,
//       totalCount: data.totalCount,
//       totalPages: data.totalPages,
//       currentPage: data.currentPage,
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching photography images', error });
//   }
// });
// app.get('/api/photography', async (req, res) => {
//   const { page, category } = req.query;
//   console.log('Query received:', { page, category });

//   try {
//     const filters = {};
//     if (category) filters.category = category;

//     const images = await PhotographyModel.find(filters)
//       .skip((page - 1) * 10)
//       .limit(10);
    
//     const totalCount = await PhotographyModel.countDocuments(filters);
//     console.log('Images fetched:', images);
    
//     res.json({
//       photographyImages: images,
//       totalPages: Math.ceil(totalCount / 10),
//     });
//   } catch (err) {
//     console.error('Error fetching data:', err);
//     res.status(500).json({ message: 'Error fetching data' });
//   }
// });


// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
