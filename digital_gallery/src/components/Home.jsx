import React from 'react';
import './Home.css';

function Home() {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Welcome to the Digital Art Gallery</h1>
                <p>Explore a curated collection of breathtaking Paintings and Photography.</p>

                <div className="home-buttons">
                    <a href="/gallery" className="btn primary-btn">Browse Gallery</a>
                    <a href="/about" className="btn secondary-btn">About Us</a>
                </div>
                
            </header>
            <section className="category-section">
                <div className="category">
                    <h2>Paintings</h2>
                    <p>Discover vibrant and expressive works of art from talented painters.</p>
                    <div className="art-grid">
                        <img src="images/image_1.png" alt="Painting 1" className="art-image" />
                        <img src="images/image_10.png" alt="Painting 2" className="art-image" />
                        <img src="images/image_100.png" alt="Painting 3" className="art-image" />
                        <img src="images/image_183.png" alt="Painting 4" className="art-image" />
                    </div>
                </div>
                <div className="category">
                    <h2>Photography</h2>
                    <p>Experience stunning photography capturing moments and emotions.</p>
                    <div className="art-grid">
                        <img src="images/image_328.png" alt="pic1"  className="art-image" />
                        <img src="images/image_282.png" alt="pic2" className="art-image" />
                        <img src="images/image_134.png" alt="pic3" className="art-image" />
                        <img src="images/image_401.png" alt="pic4" className="art-image" />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
