import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ArtistsList() {
    const [artists, setArtists] = useState({});

    useEffect(() => {
        // Fetch artists from the API and group them by first letter
        fetch('/api/artists') // Replace with your API endpoint
            .then(response => response.json())
            .then(data => {
                const groupedArtists = data.reduce((acc, artist) => {
                    const firstLetter = artist.name.charAt(0).toUpperCase();
                    if (!acc[firstLetter]) acc[firstLetter] = [];
                    acc[firstLetter].push(artist);
                    return acc;
                }, {});
                setArtists(groupedArtists);
            });
    }, []);

    return (
        <div style={{ padding: '2rem', textAlign: 'left' }}>
            <h1>Artists</h1>
            {Object.keys(artists).sort().map(letter => (
                <div key={letter} style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{ color: '#333', borderBottom: '1px solid #ccc', marginBottom: '0.5rem' }}>{letter}</h2>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {artists[letter].map(artist => (
                            <li key={artist.id} style={{ margin: '0.5rem 0' }}>
                                <Link to={`/artists/${artist.id}`}>{artist.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default ArtistsList;
