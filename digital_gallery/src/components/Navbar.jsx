
import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-item">Home</Link>
            <Link to="/photography" className="navbar-item">Photography</Link>
            <Link to="/painting" className="navbar-item">Painting</Link>
            <Link to="/artist" className="navbar-item">Artist</Link>
        </nav>
    );
}

export default Navbar;
