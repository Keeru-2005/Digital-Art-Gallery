// Cart.jsx
import React, { useState } from 'react';

const Cart = () => {
  // Initial cart item data (for demonstration)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Artist Name",
      price: 75000,
      quantity: 1,
      imageUrl: "https://via.placeholder.com/100", // Placeholder image URL
    },
  ]);

  // Update quantity
  const updateQuantity = (id, delta) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  // Calculate subtotal for each item and total for the cart
  const calculateSubtotal = (item) => item.price * item.quantity;
  const calculateTotal = () => cartItems.reduce((acc, item) => acc + calculateSubtotal(item), 0);

  return (
    <div style={cartContainerStyle}>
      {/* Cart Table Header */}
      <div style={tableHeaderStyle}>
        <span style={tableHeaderItemStyle}>Product</span>
        <span style={tableHeaderItemStyle}>Price</span>
        <span style={tableHeaderItemStyle}>Quantity</span>
        <span style={tableHeaderItemStyle}>Subtotal</span>
      </div>

      {/* Cart Items */}
      {cartItems.map((item) => (
        <div key={item.id} style={cartItemStyle}>
          <img src={item.imageUrl} alt="Product" style={productImageStyle} />
          <span style={productNameStyle}>{item.name}</span>
          <span style={priceStyle}>₹ {item.price.toLocaleString()}</span>
          <div style={quantityStyle}>
            <button onClick={() => updateQuantity(item.id, -1)} style={quantityButtonStyle}>−</button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, 1)} style={quantityButtonStyle}>+</button>
          </div>
          <span style={subtotalStyle}>₹ {calculateSubtotal(item).toLocaleString()}</span>
        </div>
      ))}

      {/* Total Price */}
      <h3 style={totalStyle}>Total: ₹ {calculateTotal().toLocaleString()}</h3>
    </div>
  );
};

const cartContainerStyle = {
  maxWidth: '800px',
  margin: '20px auto',
  fontFamily: 'Arial, sans-serif',
};

const tableHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: '#ccc',
  padding: '10px',
  fontWeight: 'bold',
};

const tableHeaderItemStyle = {
  width: '25%',
  textAlign: 'center',
};

const cartItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #ddd',
  padding: '10px 0',
};

const productImageStyle = {
  width: '80px',
  height: '80px',
  borderRadius: '5px',
};

const productNameStyle = {
  width: '25%',
  textAlign: 'center',
  color: '#888',
  fontStyle: 'italic',
};

const priceStyle = {
  width: '25%',
  textAlign: 'center',
};

const quantityStyle = {
  width: '25%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const quantityButtonStyle = {
  padding: '5px 10px',
  fontSize: '1em',
  cursor: 'pointer',
};

const subtotalStyle = {
  width: '25%',
  textAlign: 'center',
};

const totalStyle = {
  textAlign: 'right',
  fontSize: '1.5em',
  marginTop: '20px',
  fontWeight: 'bold',
};

export default Cart;
