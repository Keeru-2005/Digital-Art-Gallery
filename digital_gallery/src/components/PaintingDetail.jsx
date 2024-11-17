import React from 'react';

function PaintingDetail({ painting, onBack }) {
    const containerStyle = {
        maxWidth: '800px',
        margin: '20px auto',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    };

    const imageStyle = {
        width: '100%',
        height: '400px',
        objectFit: 'cover',
        borderRadius: '8px',
    };

    const buttonStyle = {
        marginTop: '20px',
        marginRight: '10px',
        padding: '10px 20px',
        backgroundColor: 'maroon',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    };

    const handleAddToCart = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: painting.title,
                    artist: painting.artist,
                    yearCreation: painting.yearCreation,
                    price: painting.price,
                    movement: painting.movement,
                    condition: painting.condition,
                    imageData: painting.imageData, // Base64 encoded image data
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add painting to cart');
            }

            const data = await response.json();
            alert(data.message || 'Painting added to cart successfully!');
        } catch (error) {
            console.error('Error adding painting:', error);
            alert('There was an error adding the painting. Please try again.');
        }
    };

    return (
        <div style={containerStyle}>
            <img
                src={`data:image/jpeg;base64,${painting.imageData}`}
                alt={painting.title}
                style={imageStyle}
            />
            <h1 style={{ color: 'maroon', margin: '20px 0' }}>{painting.title}</h1>
            <p><strong>Artist:</strong> {painting.artist}</p>
            <p><strong>Year of Creation:</strong> {painting.yearCreation}</p>
            <p><strong>Price:</strong> ${painting.price}</p>
            <p><strong>Movement:</strong> {painting.movement}</p>
            <p><strong>Condition:</strong> {painting.condition}</p>
            <button style={buttonStyle} onClick={onBack}>
                Back to Paintings
            </button>
            <button style={buttonStyle} onClick={handleAddToCart}>
                Add to Cart
            </button>
        </div>
    );
}

export default PaintingDetail;
