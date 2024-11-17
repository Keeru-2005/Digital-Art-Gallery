// controllers/imageController.js
const Image = require('../models/Painting');
const fs = require('fs');
const csv = require('csv-parser');

const uploadImagesFromCSV = async (req, res) => {
  const images = [];
  
  fs.createReadStream('backend/artDataset.csv')
    .pipe(csv())
    .on('data', (row) => {
      const image = new Image({
        title: row.title,
        price: parseFloat(row.price),
        artist: row.artist,
        yearCreation: parseInt(row.yearCreation),
        signed: row.signed === 'true',
        condition: row.condition,
        period: row.period,
        movement: row.movement,
        filename: row.filename,
        imageUrl: `/images/${row.filename}`, // Adjust this path as needed
      });

      images.push(image);
    })
    .on('end', async () => {
      try {
        await Image.insertMany(images);
        res.status(200).json({ message: 'Images uploaded successfully' });
      } catch (err) {
        res.status(500).json({ message: 'Error uploading images', error: err });
      }
    });
};

// Explicit export
module.exports = {
  uploadImagesFromCSV,
};
