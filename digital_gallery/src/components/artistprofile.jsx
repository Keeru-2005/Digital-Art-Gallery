import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
    

function ArtistProfile() {
    const [artist, setArtist] = useState(null);
    const location = useLocation();

    // Function to get query parameters
    const getQueryParams = (param) => {
        return new URLSearchParams(location.search).get(param);
    };

    const artistId = getQueryParams('artistId');

    useEffect(() => {
        // Fetch artist details based on artistId
        if (artistId) {
            fetch(`/api/artists/${artistId}`) // Replace with your API endpoint
                .then(response => response.json())
                .then(data => setArtist(data));
        }
    }, [artistId]);

    if (!artist) return <p>Loading...</p>;

    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <img
                src={artist.picture}
                alt={artist.name}
                style={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    marginBottom: '1rem'
                }}
            />
            <h1 style={{ marginTop: '1rem' }}>{artist.name}</h1>
            <p><strong>Biography:</strong> {artist.bio}</p>
            <p><strong>Style:</strong> {artist.style}</p>
            <p>
                <strong>Website:</strong> <a href={artist.website} target="_blank" rel="noopener noreferrer">
                    {artist.website}
                </a>
            </p>
        </div>
    );
}

export default ArtistProfile;
