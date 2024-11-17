
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart_control');

// Route to add painting to the cart
router.post('/add', cartController.addToCart);

// Route to get all items in a user's cart
router.get('/:userId', cartController.getCart);

// Route to remove painting from the cart (optional)
router.post('/remove', cartController.removeFromCart);

module.exports = router;
