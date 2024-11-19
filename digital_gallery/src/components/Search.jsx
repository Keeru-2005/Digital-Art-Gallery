import React, { useState } from 'react';

const Search = () => {
  const [query, setQuery] = useState(''); // Store search query
  const [results, setResults] = useState([]); // Store search results

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', query);

    // Clear previous results before fetching new ones
    setResults([]); // This ensures that previous results are cleared

    // Construct query parameters for unified search
    const searchParams = new URLSearchParams();
    if (query) searchParams.set('search', query); // Set the query parameter to search by any field (title, artist, movement, copyright)

    // Fetch paintings and photographs from the backend with the search query
    fetch(`http://localhost:5000/api/paintings?${searchParams.toString()}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched paintings:', data.paintings); // Debugging line
        setResults((prevResults) => [...prevResults, ...(data.paintings || [])]); // Append filtered paintings
      })
      .catch((error) => {
        console.error('Error fetching paintings:', error);
      });

    fetch(`http://localhost:5000/api/photographies?${searchParams.toString()}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched photographs:', data.photographyImages); // Debugging line
        setResults((prevResults) => [...prevResults, ...(data.photographyImages || [])]); // Append filtered photographs
      })
      .catch((error) => {
        console.error('Error fetching photographs:', error);
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
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  };
  const resultItemStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };
  const titleStyle = { fontSize: '18px', fontWeight: 'bold' };
  const artistStyle = { fontSize: '14px', fontStyle: 'italic' };
  const movementStyle = { fontSize: '12px', color: '#555' };
  const copyrightStyle = { fontSize: '12px', color: '#555' };
  const noResultsStyle = { color: '#888' };
  const imageStyle = { width: '100%', maxHeight: '150px', objectFit: 'cover', borderRadius: '8px' };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSearch} style={formStyle}>
        <input
          type="text"
          placeholder="Search by title, artist, movement, or copyright..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>
          Search
        </button>
      </form>

      <div style={gridStyle}>
        {results.length > 0 ? (
          results.map((artwork, index) => (
            <div key={index} style={resultItemStyle}>
              <h3 style={titleStyle}>{artwork.title}</h3>
              {artwork.artist && <p style={artistStyle}>by {artwork.artist}</p>}
              {artwork.movement && <p style={movementStyle}>Movement: {artwork.movement}</p>}
              {artwork.copyright && <p style={copyrightStyle}>Copyright: {artwork.copyright}</p>}
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
