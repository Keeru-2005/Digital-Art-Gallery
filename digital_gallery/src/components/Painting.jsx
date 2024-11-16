import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Painting() {
  const [paintings, setPaintings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: ''
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch paintings data when the component mounts or the filters change
  useEffect(() => {
    const { category, minPrice, maxPrice } = filters;

    const queryParams = new URLSearchParams({
      page: currentPage,
      limit: 28,
      ...(category && { category }),
      ...(minPrice && { minPrice }),
      ...(maxPrice && { maxPrice })
    }).toString();

    setLoading(true);

    fetch(`http://localhost:5000/api/paintings?${queryParams}`)
      .then((response) => response.json())
      .then((data) => {
        setPaintings(data.paintings || []);
        setTotalPages(data.totalPages || 1);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching paintings:', error);
        setLoading(false);
      });
  }, [currentPage, filters]);

  // Fetch categories
  useEffect(() => {
    fetch('http://localhost:5000/api/categories')
      .then((response) => response.json())
      .then((data) => {
        setCategories(data || []);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Navigate to the painting detail page
  const handlePaintingClick = (paintingId) => {
    navigate(`/paintings/${paintingId}`);
  };

  return (
    <div>
      <h1>Welcome to the Painting Page</h1>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Sidebar for filters */}
        <div style={{ width: '250px', padding: '20px', backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <h3>Filter Paintings</h3>

          <div>
            <label>Category:</label>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px' }}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Min Price:</label>
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px' }}
            />
          </div>

          <div>
            <label>Max Price:</label>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px' }}
            />
          </div>
        </div>

        {/* Paintings List */}
        <div style={{ flex: 1 }}>
          {loading ? (
            <p>Loading paintings...</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
              {paintings.length === 0 ? (
                <p>No paintings found.</p>
              ) : (
                paintings.map((painting) => (
                  <div
                    key={painting._id}
                    style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', cursor: 'pointer' }}
                    onClick={() => handlePaintingClick(painting._id)}
                  >
                    <img
                      src={`data:image/jpeg;base64,${painting.imageData}`}
                      alt={painting.title}
                      style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }}
                    />
                    <h3>{painting.title}</h3>
                    <p>Price: {painting.price}</p>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Pagination */}
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{ padding: '10px', margin: '0 5px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px' }}
            >
              Previous
            </button>
            <span>{currentPage} / {totalPages}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{ padding: '10px', margin: '0 5px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px' }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Painting;
