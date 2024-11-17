const Cart = require('../models/cart');
const Painting = require('../models/Painting'); // Assuming paintings are in a separate model

// Add painting to the cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, paintingId } = req.body;

    const painting = await Painting.findById(paintingId);
    if (!painting) {
      return res.status(404).json({ message: 'Painting not found' });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex((item) => item.paintingId.toString() === paintingId);
    if (existingItemIndex !== -1) {
      // If painting is already in the cart, increase the quantity
      cart.items[existingItemIndex].quantity += 1;
    } else {
      // Otherwise, add the painting to the cart
      cart.items.push({
        paintingId,
        title: painting.title,
        imageData: painting.imageData,
        price: painting.price,
      });
    }

    await cart.save();
    res.status(200).json({ cartItems: cart.items });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get items in the cart
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate('items.paintingId');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json({ items: cart.items });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove painting from the cart (optional)
exports.removeFromCart = async (req, res) => {
  try {
    const { userId, paintingId } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter((item) => item.paintingId.toString() !== paintingId);
    await cart.save();
    res.status(200).json({ cartItems: cart.items });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
