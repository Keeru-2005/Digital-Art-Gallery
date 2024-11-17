import React from 'react';

function About() {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px 20px',
        backgroundColor: '#f4f4f8',
        color: '#333',
        fontFamily: 'Arial, sans-serif',
        minHeight: '100vh',
    };

    const headingStyle = {
        fontSize: '2.5rem',
        marginBottom: '20px',
        color: '#444',
    };

    const paragraphStyle = {
        fontSize: '1.2rem',
        lineHeight: '1.6',
        maxWidth: '800px',
        marginBottom: '30px',
        color: '#666',
    };

    const buttonStyle = {
        display: 'inline-block',
        textDecoration: 'none',
        padding: '10px 20px',
        fontSize: '1rem',
        borderRadius: '5px',
        backgroundColor: '#007bff',
        color: '#fff',
        transition: 'background-color 0.3s ease',
        cursor: 'pointer',
    };

    const buttonHoverStyle = {
        ...buttonStyle,
        backgroundColor: '#0056b3',
    };

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>About Us</h1>
            <p style={paragraphStyle}>
                Welcome to the Digital Art Gallery! Our mission is to bring together creative minds
                from across the world and showcase their talents. Whether you are an artist looking
                to share your work or an art lover exploring new horizons, this is the perfect space
                for you.
            </p>
            <p style={paragraphStyle}>
                We believe art has the power to inspire, connect, and transform. Our curated
                collection features diverse artworks ranging from digital paintings to innovative
                multimedia projects. Join us in celebrating the vibrant world of art and creativity.
            </p>
            <a
                href="/gallery"
                style={buttonStyle}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
            >
                Explore Our Gallery
            </a>
        </div>
    );
}

export default About;
