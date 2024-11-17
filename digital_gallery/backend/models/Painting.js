const mongoose = require("mongoose");

const paintingSchema = new mongoose.Schema({
  title: String,

  price: String,
  imageData: String, // base64 encoded image
  
});

module.exports = mongoose.model("images", paintingSchema);
