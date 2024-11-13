// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Photography from './Photography';
import Painting from './Painting';
import Artist from './Artist';
import Profile from './Profile';
import Search from './Search';
import Cart from './Cart';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/photography" element={<Photography />} />
                <Route path="/painting" element={<Painting />} />
                <Route path="/artist" element={<Artist />} />            
                <Route path="/search" element={<Search />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile" element={<Profile />} />

            </Routes>
        </Router>
    );
}

export default App;
