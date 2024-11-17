import React, { useEffect, useState } from "react";

function All() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        // Fetch the images from MongoDB or your API here
        // Example: Fetch from a hypothetical API endpoint
        fetch("/api/images/all") // Replace with your actual API endpoint
            .then((response) => response.json())
            .then((data) => setImages(data))
            .catch((error) => console.error("Error fetching images:", error));
    }, []);

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1 style={{ fontSize: "2.5rem", marginBottom: "30px", color: "#333" }}>
                All Images
            </h1>
            <p style={{ fontSize: "1rem", color: "#666", marginBottom: "30px" }}>
                Browse through the complete collection of images.
            </p>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "20px",
                    padding: "10px",
                }}
            >
                {images.length === 0 ? (
                    <p>Loading images...</p>
                ) : (
                    images.map((image) => (
                        <div key={image._id} style={{ padding: "10px" }}>
                            <img
                                src={image.url} // Assuming you have the image URL in the data
                                alt={image.name} // Assuming you have a name for each image
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    borderRadius: "10px",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                                }}
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default All;
