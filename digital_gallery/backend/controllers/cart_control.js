const Cart = require('../models/cart');
const Painting = require('../models/Painting');
const jwt = require('jsonwebtoken');

// Add painting to the cart
exports.addToCart = async (req, res) => {
  try {
    const { paintingId } = req.body;
    const token = req.headers['authorization']; // Get JWT token from header

    if (!token) {
      return res.status(403).json({ message: 'Token is required' });
    }

    // Verify JWT token and extract userId
    jwt.verify(token, 'yourSecretKey', async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
      }

      const userId = decoded.userId;
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
        cart.items[existingItemIndex].quantity += 1;
      } else {
        cart.items.push({
          paintingId,
          title: painting.title,
          imageData: painting.imageData,
          price: painting.price,
        });
      }

      await cart.save();
      res.status(200).json({ cartItems: cart.items });
    });
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

// Remove painting from the cart

// Remove painting from the cart
exports.removeFromCart = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Extract token
        if (!token) {
            return res.status(401).json({ message: 'Authorization token required' });
        }

        // Decode token to get userId
        const decoded = jwt.verify(token, 'yourSecretKey');
        const userId = decoded.userId;

        const { paintingId } = req.body; // Get paintingId from the request body

        // Find the user's cart
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Remove the item with the specified paintingId
        const initialLength = cart.items.length;
        cart.items = cart.items.filter(item => item.paintingId.toString() !== paintingId);

        if (cart.items.length === initialLength) {
            return res.status(400).json({ message: 'Item not found in cart' });
        }

        // Save the updated cart
        await cart.save();

        return res.status(200).json({ message: 'Item removed successfully', cartItems: cart.items });
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

  
  



exports.clearCart = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Authorization token required' });
        }

        const decoded = jwt.verify(token, 'yourSecretKey');
        const userId = decoded.userId;

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = []; // Clear all items
        await cart.save();

        res.status(200).json({ message: 'Cart cleared successfully', cartItems: [] });
    } catch (error) {
        console.error('Error clearing the cart:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


