// upload_photography.js
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

mongoose.connect('mongodb://localhost:27017/artgallery', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const photographySchema = new mongoose.Schema({
  title: String,
  
  price: String,
  date:String,
  copyright:String,
  explanation:String,//
  imageData: String,
});

const Photography = mongoose.model('Photography', photographySchema);

const csvFilePath = 'apod_data.csv'; // Update this to the correct CSV file path
const imagesFolderPath = 'photography/apod_images/apod_images'; // Update this to the correct folder path containing images

async function uploadPhotography() {
  const records = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      records.push(row);
    })
    .on('end', async () => {
      for (const record of records) {
        const { title, price, date, copyright, explanation } = record;
        const filename = `${date}.jpg`; // Assuming filenames are in 'YYYY-MM-DD.jpg' format


        if (!filename) {
          console.error(`Filename is missing for record: ${title}`);
          continue; // Skip this record if filename is missing
        }

        // Construct the full path to the image file
        const imagePath = path.join(imagesFolderPath, filename);

        // Check if image file exists
        if (!fs.existsSync(imagePath)) {
          console.error(`Image file ${filename} not found in path ${imagesFolderPath}`);
          continue; // Skip if image file is not found
        }

        // Read and convert the image to base64
        const imageData = fs.readFileSync(imagePath, { encoding: 'base64' });

        // Create a new Photography document
        const newPhotography = new Photography({
          title,
          price,
          date,
          copyright,
          explanation,
          imageData,
        });

        // Save to MongoDB
        await newPhotography.save();
        console.log(`Uploaded ${title} to MongoDB (Photography).`);
      }

      mongoose.connection.close();
      console.log('All photography images uploaded successfully!');
    });
}

uploadPhotography();
