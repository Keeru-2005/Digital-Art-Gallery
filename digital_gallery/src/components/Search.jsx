// Search.jsx
import React, { useState } from 'react';

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Simulated data (can be replaced with actual data from a database in the future)
  const artworks = [
    { id: 1, title: "Sunset Bliss", artist: "John Doe" },
    { id: 2, title: "Mountain Majesty", artist: "Jane Smith" },
    { id: 3, title: "Urban Landscape", artist: "Emily Green" },
    { id: 4, title: "Abstract Wonder", artist: "Michael Brown" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();

    // Filter artworks based on the search query
    const filteredResults = artworks.filter(artwork =>
      artwork.title.toLowerCase().includes(query.toLowerCase()) ||
      artwork.artist.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filteredResults);
  };

  return (
    <div style={{ width: '75%', margin: '0 auto' }}>
      <form onSubmit={handleSearch} style={formStyle}>
        <input
          type="text"
          placeholder="Search artworks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Search</button>
      </form>

      {/* Display search results */}
      <div style={resultsStyle}>
        {results.length > 0 ? (
          results.map((artwork) => (
            <div key={artwork.id} style={resultItemStyle}>
              <h3>{artwork.title}</h3>
              <p>by {artwork.artist}</p>
            </div>
          ))
        ) : (
          query && <p>No results found</p>
        )}
      </div>
    </div>
  );
};

const formStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  margin: '20px auto',
};

const inputStyle = {
  width: '100%',
  padding: '15px',
  fontSize: '1.2em',
  borderRadius: '8px 0 0 8px',
  border: '1px solid #ccc',
  outline: 'none',
};

const buttonStyle = {
  padding: '15px 25px',
  fontSize: '1.2em',
  borderRadius: '0 8px 8px 0',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
};

const resultsStyle = {
  marginTop: '20px',
  textAlign: 'center',
};

const resultItemStyle = {
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '5px',
  margin: '10px 0',
};

export default Search;
