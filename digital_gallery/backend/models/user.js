const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Add the comparePassword method that's used in your controller

module.exports = mongoose.model('User',userSchema,'user');