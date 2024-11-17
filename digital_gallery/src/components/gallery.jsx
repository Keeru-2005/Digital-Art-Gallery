import React from "react";
import { Link } from "react-router-dom";
import "./Gallery.css"; // Import the external CSS file

function Gallery() {
    return (
        <div>
            {/* About Section */}
            <div className="gallery-container">
                <h1 className="gallery-heading">About Us</h1>
                <p className="gallery-paragraph">
                    Welcome to the Digital Art Gallery! Our mission is to bring together creative minds
                    from across the world and showcase their talents. Whether you are an artist looking
                    to share your work or an art lover exploring new horizons, this is the perfect space
                    for you.
                </p>
                <p className="gallery-paragraph">
                    We believe art has the power to inspire, connect, and transform. Our curated
                    collection features diverse artworks ranging from digital paintings to innovative
                    multimedia projects. Join us in celebrating the vibrant world of art and creativity.
                </p>
                
            </div>

            {/* Categories Section */}
            <div style={{ textAlign: "center", padding: "20px" }}>
                <h1 className="gallery-heading">Explore Our Gallery</h1>
               
                <div className="gallery-grid">
                    {/* Card 1: Photography */}
                    <div className="gallery-card">
                        <h2>Photography</h2>
                        <Link to="/Photography">
                            <img src="images/2023-01-17.jpg" alt="Photography" />
                        </Link>
                    </div>

                    {/* Card 2: Paintings */}
                    <div className="gallery-card">
                        <h2>Paintings</h2>
                        <Link to="/Painting">
                            <img src="images/image_347.png" alt="Paintings" />
                        </Link>
                    </div>
                </div>
                <Link to="/Home" className="gallery-button">
                    Back to Home
            </Link>
            </div>

            
        </div>
    );
}

export default Gallery;
