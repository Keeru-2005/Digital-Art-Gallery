import React from 'react';

function PhotographDetail({ photography, onBack }) {
    // Inline styles for consistency
    const containerStyle = {
        margin: '20px auto',
        maxWidth: '800px',
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
        marginRight:'10px',
        padding: '10px 20px',
        backgroundColor: '#A44277',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    };

    return (
        <div style={containerStyle}>
            <img
                src={`data:image/jpeg;base64,${photography.imageData}`}
                alt={photography.title}
                style={imageStyle}
            />
            <h1 style={{ color: 'maroon', margin: '20px 0' }}>{photography.title}</h1>
            <p>Copyright: {photography.copyright}</p>
            <p>Price: USD {photography.price}</p>
            <p>{photography.explanation}</p> {/* Add explanation if available */}
            <button style={buttonStyle} onClick={onBack}>
                Back to Photography
            </button>
            <button style={buttonStyle}>Add to Cart</button>
        </div>
    );
}

export default PhotographDetail;
