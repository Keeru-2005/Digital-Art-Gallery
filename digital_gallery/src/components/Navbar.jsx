
import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-item">Home</Link>
            <Link to="/photography" className="navbar-item">Photography</Link>
            <Link to="/painting" className="navbar-item">Painting</Link>
            <Link to="/artistlist" className="navbar-item">Artists</Link>
            {/* <Route path="/artists" element={<ArtistsList />} />
                <Route path="/artists/:artistId" element={<ArtistProfile />} /> */}
            <Link to="/search" className="navbar-item">Search</Link>
            <Link to="/cart" className="navbar-item">Cart</Link>
            <Link to="/profile" className="navbar-item">Profile</Link>
        </nav>
    );
}

export default Navbar;
