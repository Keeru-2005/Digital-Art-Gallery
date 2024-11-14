const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// MongoDB Schema for storing image metadata and image data
const imageSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  price: String,  // Add price field
  imageData: String, // Base64 encoded image data
});

const Image = mongoose.model('Image', imageSchema);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/artgallery', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Path to the CSV file and images folder
const csvFilePath = 'artDataset.csv';
const imagesFolderPath = 'artDataset';

// Function to upload images and metadata to MongoDB
async function uploadImages() {
  const imageRecords = [];

  // Step 1: Read CSV file and store metadata in an array
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      imageRecords.push(row);
    })
    .on('end', async () => {
      console.log('CSV file successfully processed.');

      // Step 2: Process each record, match it with an image file, and save it to MongoDB
      for (const record of imageRecords) {
        const { title, description, category, price, filename } = record;

        // Construct the full path to the image file
        const imagePath = path.join(imagesFolderPath, filename);

        // Check if image file exists
        if (fs.existsSync(imagePath)) {
          // Read and convert the image to base64
          const imageData = fs.readFileSync(imagePath, { encoding: 'base64' });

          // Create a new Image document
          const newImage = new Image({
            title,
            description,
            category,
            price,
            imageData, // Store base64 image data
          });

          // Save to MongoDB
          await newImage.save();
          console.log(`Uploaded ${title} to MongoDB.`);
        } else {
          console.error(`Image file ${filename} not found for record ${title}.`);
        }
      }

      mongoose.connection.close();
      console.log('All images uploaded successfully!');
    });
}

uploadImages();
