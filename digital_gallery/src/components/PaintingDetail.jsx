import React from 'react';

function PaintingDetail({ painting, onBack, addToCart }) {
    // Inline styles for detail view
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
            {/* <p><strong>Description:</strong> {painting.description}</p> */}
            <button style={buttonStyle} onClick={onBack}>
                Back to Paintings
            </button>
            <button style={buttonStyle} onClick={() => addToCart(painting)}>
                Add to Cart
            </button>
        </div>
    );
}

export default PaintingDetail;
