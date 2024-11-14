import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Include CSS for styling

function Home() {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Welcome to the Digital Art Gallery!</h1>
                <p>Explore a curated collection of creative works from talented artists worldwide.</p>
                <div className="home-buttons">
                    <Link to="/gallery" className="btn">Browse Gallery</Link>
                    <Link to="/about" className="btn">About Us</Link>
                </div>
            </header>
            <section className="featured-art">
                <h2>Featured Art</h2>
                {/* This section could display thumbnails or previews of featured artwork */}
                <div className="art-preview">
                    <img src="/path/to/art1.jpg" alt="Art 1" />
                    <img src="/path/to/art2.jpg" alt="Art 2" />
                    <img src="/path/to/art3.jpg" alt="Art 3" />
                </div>
            </section>
        </div>
    );
}

export default Home;
