import React from "react";
import { Link } from "react-router-dom";

function Gallery() {
    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1 style={{ fontSize: "2.5rem", marginBottom: "30px", color: "#333" }}>
                Explore Our Gallery
            </h1>
            <p style={{ fontSize: "1rem", color: "#666", marginBottom: "30px" }}>
                Choose a category to browse the artworks.
            </p>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "20px",
                    padding: "10px",
                }}
            >
                {/* Link to All Images */}
                <div
                    style={{
                        padding: "20px",
                        cursor: "pointer",
                        background: "#f1f1f1",
                        borderRadius: "10px",
                        textAlign: "center",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        transition: "transform 0.3s, box-shadow 0.3s",
                    }}
                >
                    <h2>All Images</h2>
                    <Link to="/All">
                        <img
                            src="images/image_239.png" // Replace with your image path
                            alt="All Images"
                            style={{
                                width: "100%",
                                height: "auto",
                                borderRadius: "10px",
                                transition: "transform 0.3s, box-shadow 0.3s",
                            }}
                        />
                    </Link>
                </div>

                {/* Link to Photography */}
                <div
                    style={{
                        padding: "20px",
                        cursor: "pointer",
                        background: "#f1f1f1",
                        borderRadius: "10px",
                        textAlign: "center",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        transition: "transform 0.3s, box-shadow 0.3s",
                    }}
                >
                    <h2>Photography</h2>
                    <Link to="/Photography">
                        <img
                            src="images/image_483.png" // Replace with your image path
                            alt="Photography"
                            style={{
                                width: "100%",
                                height: "auto",
                                borderRadius: "10px",
                                transition: "transform 0.3s, box-shadow 0.3s",
                            }}
                        />
                    </Link>
                </div>

                {/* Link to Paintings */}
                <div
                    style={{
                        padding: "20px",
                        cursor: "pointer",
                        background: "#f1f1f1",
                        borderRadius: "10px",
                        textAlign: "center",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        transition: "transform 0.3s, box-shadow 0.3s",
                    }}
                >
                    <h2>Paintings</h2>
                    <Link to="/Painting">
                        <img
                            src="images/image_102.png" // Replace with your image path
                            alt="Paintings"
                            style={{
                                width: "100%",
                                height: "auto",
                                borderRadius: "10px",
                                transition: "transform 0.3s, box-shadow 0.3s",
                            }}
                        />
                    </Link>
                </div>
            </div>

            {/* Style for Hover Effects */}
            <style>{`
                div > div:hover img {
                    transform: scale(1.05); /* Slight zoom on hover */
                }
                div > div:hover {
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3); /* Stronger shadow on hover */
                    transform: translateY(-5px); /* Slight upward movement */
                }
            `}</style>
        </div>
    );
}

export default Gallery;
