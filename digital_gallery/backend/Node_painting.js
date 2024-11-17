// upload_paintings.js
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

mongoose.connect('mongodb://localhost:27017/artgallery', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//filesdfjhcghj,price,artist,title,yearCreation,signed,condition,period,movement,filename
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

const csvFilePath = 'artDataset.csv';
const imagesFolderPath = 'artDataset';

async function uploadPaintings() {
  const records = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      records.push(row);
    })
    .on('end', async () => {
      for (const record of records) {
        const { title, description, condition, artist, yearCreation,  movement, price, filename } = record;
        const imagePath = path.join(imagesFolderPath, filename);

        if (fs.existsSync(imagePath)) {
          const imageData = fs.readFileSync(imagePath, { encoding: 'base64' });

          const newPainting = new Painting({
            title,
            description,
            condition,
            artist,
            yearCreation,
            movement,
            price,
            imageData,
          });

          await newPainting.save();
          console.log(`Uploaded ${title} to MongoDB (Paintings).`);
        }
      }

      mongoose.connection.close();
      console.log('All paintings uploaded successfully!');
    });
}

uploadPaintings();
