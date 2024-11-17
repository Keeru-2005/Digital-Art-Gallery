import React, { useEffect, useState } from 'react';

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
    const [loading, setLoading] = useState(true);  // For loading state
    const [cart, setCart] = useState([]);  // Cart state to store added paintings

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

        setLoading(true);  // Set loading to true before fetch starts

        fetch(`http://localhost:5000/api/paintings?${queryParams}`)
            .then((response) => response.json())
            .then((data) => {
                setPaintings(data.paintings || []);  // Ensure paintings is an array
                setTotalPages(data.totalPages || 1);
                setLoading(false);  // Set loading to false when fetch is done
            })
            .catch((error) => {
                console.error('Error fetching paintings:', error);
                setLoading(false);  // Set loading to false in case of error
            });
            console.log(paintings)
    }, [currentPage, filters]);

    // Fetch categories (optional, if categories are not hardcoded)
    useEffect(() => {
        fetch('http://localhost:5000/api/categories') // This would be another endpoint if needed
            .then((response) => response.json())
            .then((data) => {
                setCategories(data || []);  // Ensure categories is an array
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    // Change filter values
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value
        }));
    };

    // Change page
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Add painting to the cart
    const handleAddToCart = (painting) => {
        setCart((prevCart) => [...prevCart, painting]);
    };

    // Inline Styles
    const containerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '0 20px',
    };

    const sidebarStyle = {
        width: '250px',
        padding: '20px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        marginRight: '20px',
    };

    const headingStyle = {
        textAlign: 'center',
        color: 'maroon',
        margin: '20px 0',
    };

    const gridContainerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        marginTop: '20px',
    };

    const paintingCardStyle = {
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease',
    };

    const paintingImageStyle = {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        borderRadius: '4px',
    };

    const paintingInfoStyle = {
        marginTop: '10px',
    };

    const addToCartButtonStyle = {
        padding: '10px 20px',
        backgroundColor: 'maroon',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '10px',
    };

    const paginationButtonStyle = {
        padding: '10px 20px',
        backgroundColor: 'maroon',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    };

    const paginationStyle = {
        textAlign: 'center',
        marginTop: '20px',
    };

    const paginationDisabledButtonStyle = {
        backgroundColor: '#ccc',
        cursor: 'not-allowed',
    };

    return (
        <div>
            <h1 style={headingStyle}>Welcome to the Painting Page</h1>

            {/* Cart display */}
            <div style={{ margin: '20px' }}>
                <h2 style={{ color: 'maroon' }}>Your Cart</h2>
                <ul>
                    {cart.map((item, index) => (
                        <li key={index}>{item.title} - ${item.price}</li>
                    ))}
                </ul>
            </div>

            <div style={containerStyle}>
                {/* Sidebar for filters */}
                <div style={sidebarStyle}>
                    <h3 style={{ color: 'maroon' }}>Filter Paintings</h3>

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
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>Min Price:</label>
                        <input
                            type="String"
                            name="minPrice"
                            value={filters.minPrice}
                            onChange={handleFilterChange}
                            style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px' }}
                        />
                    </div>

                    <div>
                        <label>Max Price:</label>
                        <input
                            type="String"
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
                        <p>Loading paintings...</p>  // Loading state
                    ) : (
                        <div style={gridContainerStyle}>
                            {paintings.length === 0 ? (
                                <p>No paintings found.</p>
                            ) : (
                                paintings.map((painting) => (
                                    <div style={paintingCardStyle} key={painting._id}>
                                        <img
                                            src={`data:image/jpeg;base64,${painting.imageData}`}
                                            alt={painting.title}
                                            style={paintingImageStyle}
                                        />
                                        <div style={paintingInfoStyle}>
                                            <h3 style={{ color: 'maroon' }}>{painting.title}</h3>
                                            <p>Price: {painting.price}</p>
                                            <button
                                                style={addToCartButtonStyle}
                                                onClick={() => handleAddToCart(painting)}
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {/* Pagination */}
                    <div style={paginationStyle}>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            style={{
                                ...paginationButtonStyle,
                                ...(currentPage === 1 ? paginationDisabledButtonStyle : {}),
                            }}
                        >
                            Previous
                        </button>
                        <span>{` Page ${currentPage} of ${totalPages} `}</span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            style={{
                                ...paginationButtonStyle,
                                ...(currentPage === totalPages ? paginationDisabledButtonStyle : {}),
                            }}
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