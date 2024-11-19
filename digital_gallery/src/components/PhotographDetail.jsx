//photographdetail.jsx

import React from 'react';
import axios from 'axios';
function safeStringify(obj) {
    const seen = new Set();
    return JSON.stringify(obj, (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return;  // Return undefined to avoid circular references
            }
            seen.add(value);
        }
        return value;
    });
}

function PhotographDetail({ photography, onBack }) {
    const handleAddToCart = () => {
        console.log(photography);  // Log the photography object
        console.log(photography.constructor.name); // This will print "Object" if it's a plain object



        // Ensure that photography is a plain object without Mongoose methods
        const photographyId = photography._id ? photography._id.toString() : photography._id;  // Ensure _id is a string
    
        const userId = 'someUserId';  // Replace with actual user ID from authentication logic
    
        axios.post('http://localhost:5000/api/add', {
            userId,
            itemId: photographyId,  // Send the photography ID as a string
            type: 'photography',  // This tells the backend that it's a photography item
        })
        .then(response => {
            console.log('Added photography to cart:', response.data);
            // Optionally, you could update state or show a confirmation message
        })
        .catch(error => {
            console.error('Error adding photography to cart:', error);
            alert('There was an error adding the photography to the cart. Please try again.');
        });
    };
      
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
      <p>{photography.explanation}</p>
      <button style={buttonStyle} onClick={onBack}>
        Back to Photography
      </button>
      <a href={`data:image/jpeg;base64,${photography.imageData}`} download={photography.title}>Download</a>
    </div>
  );
}

export default PhotographDetail;