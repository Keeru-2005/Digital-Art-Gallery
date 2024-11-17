import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Photography from './Photography';
import Painting from './Painting';
import Profile from './Profile';
import Search from './Search';
import Cart from './Cart';
import PaintingDetail from './PaintingDetail';
import Gallery from './gallery';

function App() {
    // Initialize cart state
    const [cart, setCart] = useState([]);

    // Add painting to cart
    const addToCart = (painting) => {
        setCart((prevCart) => [...prevCart, painting]);
        alert(`${painting.title} added to cart`);
    };

    // Remove painting from cart
    const removeFromCart = (painting) => {
        setCart((prevCart) => prevCart.filter((item) => item._id !== painting._id));
        alert(`${painting.title} removed from cart`);
    };

    // Clear the cart
    const clearCart = () => {
        setCart([]);
    };

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/photography" element={<Photography />} />
                <Route path="/painting" element={<Painting />} />
                <Route path="/search" element={<Search />} />
                <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} />} />
                <Route path="/profile" element={<Profile />} />
                <Route 
                    path="/paintings/:paintingId" 
                    element={<PaintingDetail addToCart={addToCart} />} 
                />
                <Route path="/gallery" element={<Gallery />} />
            </Routes>
        </Router>
    );
}

export default App;
