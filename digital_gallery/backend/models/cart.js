const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    yearCreation: { type: String, required: true },
    price: { type: String, required: true },
    movement: { type: String, required: true },
    condition: { type: String, required: true },
    imageData: { type: String, required: true },
    // userId is now optional (or removed if not needed)
    userId: { type: String, required: false },  // If you want to keep it optional
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
