import React, { useState } from 'react';

const Search = () => {
  const [query, setQuery] = useState(''); // Store search query
  const [results, setResults] = useState([]); // Store search results

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', query);

    // Construct query parameters
    const searchParams = new URLSearchParams();
    if (query) {
      searchParams.set('title', query); // Set the title as the query parameter
    }

    // Fetch the paintings from the backend with the search query
    fetch(`http://localhost:5000/api/paintings?${searchParams.toString()}`)
      .then((response) => response.json())
      .then((data) => {
        setResults(data.paintings); // Set the filtered paintings in the state
        console.log('Filtered results:', data.paintings); // Log the results
      })
      .catch((error) => {
        console.error('Error fetching paintings:', error);
      });
  };

  // Inline styles
  const containerStyle = { padding: '20px' };
  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
  };
  const inputStyle = {
    padding: '10px',
    marginBottom: '10px',
    fontSize: '16px',
  };
  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#A44277', // Dark purple
    color: 'white',
    border: 'none',
    borderRadius: '25px', // Rounded corners
    fontFamily: "'Times', sans-serif",
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    textTransform: 'uppercase',
    transition: 'all 0.3s ease', // Smooth transition for all effects
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
    display: 'inline-block',
    margin: '10px', // Some space around the button
  };
  
  
  const resultsStyle = { marginTop: '20px' };
  const resultItemStyle = {
    marginBottom: '10px',
    borderBottom: '1px solid #ccc',
    paddingBottom: '10px',
  };
  const titleStyle = { fontSize: '20px', fontWeight: 'bold' };
  const artistStyle = { fontSize: '16px', fontStyle: 'italic' };
  const movementStyle = { fontSize: '14px', color: '#555' };
  const noResultsStyle = { color: '#888' };
  const imageStyle = { width: '100%', maxWidth: '400px', height: 'auto' };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSearch} style={formStyle}>
        <input
          type="text"
          placeholder="Search by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>
          Search
        </button>
      </form>

      <div style={resultsStyle}>
        {results.length > 0 ? (
          results.map((artwork, index) => (
            <div key={index} style={resultItemStyle}>
              <h3 style={titleStyle}>{artwork.title}</h3>
              {artwork.artist && (
                <p style={artistStyle}>by {artwork.artist}</p>
              )}
              {artwork.movement && (
                <p style={movementStyle}>Movement: {artwork.movement}</p>
              )}
              {artwork.imageData && (
                <img
                  src={`data:image/jpeg;base64,${artwork.imageData}`}
                  alt={artwork.title}
                  style={imageStyle}
                />
              )}
            </div>
          ))
        ) : (
          query && <p style={noResultsStyle}>No results found</p>
        )}
      </div>
    </div>
  );
};

export default Search;
