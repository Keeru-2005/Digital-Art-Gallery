import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PaintingDetails = () => {
  const { paintingId } = useParams(); // Get paintingId from the URL
  const [painting, setPainting] = useState(null);  // Initially set to null to indicate no painting loaded yet
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaintingDetails = async () => {
      try {
        const response = await axios.get(`/api/paintings/${paintingId}`);
        setPainting(response.data);
      } catch (error) {
        console.error('Error fetching painting details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaintingDetails();
  }, [paintingId]);

  if (loading) {
    return <div>Loading...</div>;  // Show loading while data is being fetched
  }

  if (!painting) {
    return <div>Painting not found</div>;  // Show message if painting is not found
  }

  return (
    <div>
      <h1>{painting.title}</h1>
      <img src={`data:image/png;base64,${painting.imageData}`} alt={painting.title} />
      <p>{painting.description}</p>
      <p>Price: {painting.price}</p>
      <button>Add to Cart</button> {/* Add cart functionality as needed */}
    </div>
  );
};

export default PaintingDetails;
