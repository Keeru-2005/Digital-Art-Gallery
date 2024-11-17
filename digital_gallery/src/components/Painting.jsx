import React, { useEffect, useState } from 'react';
import PaintingDetail from './PaintingDetail';
import axios from 'axios';

function Paintings() {
    const [paintings, setPaintings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPainting, setSelectedPainting] = useState(null); // Selected painting
    const [cartItems, setCartItems] = useState([]); // To store the user's cart items

    const [filters, setFilters] = useState({
        yearCreation: '',
        movement: '',
        minPrice: '',
        maxPrice: '',
    });

    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const [totalPages, setTotalPages] = useState(1); // Track total pages

    useEffect(() => {
        setLoading(true);

        fetch(`http://localhost:5000/api/paintings?page=${currentPage}&limit=28`)
            .then((response) => response.json())
            .then((data) => {
                setPaintings(data.paintings || []);
                setTotalPages(data.totalPages || 1); // Set total pages if available
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching paintings:', error);
                setLoading(false);
            });
    }, [currentPage]); // Re-run the effect when the currentPage changes

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const handleTileClick = (painting) => {
        setSelectedPainting(painting);
    };

    const handleBack = () => {
        setSelectedPainting(null);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1); // Go to the next page
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1); // Go to the previous page
        }
    };

    const handleAddToCart = async (painting) => {
        // Add painting to the cart (local state or backend)
        const userId = '12345'; // Replace with dynamic userId (perhaps from context or login)
        try {
            const response = await axios.post('http://localhost:5000/api/add', { userId, paintingId: painting._id });
            // Assuming the response includes updated cart items
            setCartItems(response.data.cartItems);
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    // Apply filters
    const filteredPaintings = paintings.filter((painting) => {
        const yearMatch = !filters.yearCreation || painting.yearCreation === filters.yearCreation;
        const movementMatch = !filters.movement || painting.movement.toLowerCase().includes(filters.movement.toLowerCase());
        const priceNumber = parseFloat(painting.price.split(' ')[0].replace('.', ''));
        const minPrice = filters.minPrice ? parseFloat(filters.minPrice.replace('.', '')) : null;
        const maxPrice = filters.maxPrice ? parseFloat(filters.maxPrice.replace('.', '')) : null;
        const priceMatch = (minPrice === null || priceNumber >= minPrice) && (maxPrice === null || priceNumber <= maxPrice);
        return yearMatch && movementMatch && priceMatch;
    });

    const sidebarStyle = {
        width: '250px',
        padding: '20px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        marginRight: '20px',
    };

    const gridContainerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
    };

    const paintingCardStyle = {
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
    };

    if (selectedPainting) {
        return <PaintingDetail painting={selectedPainting} onBack={handleBack} />;
    }

    return (
        <div style={{ display: 'flex', margin: '20px' }}>
            <div style={sidebarStyle}>
                <h3>Filters</h3>
                <div>
                    <label>Year of Creation:</label>
                    <input
                        type="text"
                        name="yearCreation"
                        value={filters.yearCreation}
                        onChange={handleFilterChange}
                        style={{ width: '100%', marginTop: '5px', padding: '8px' }}
                    />
                </div>
                <div>
                    <label>Movement:</label>
                    <input
                        type="text"
                        name="movement"
                        value={filters.movement}
                        onChange={handleFilterChange}
                        style={{ width: '100%', marginTop: '5px', padding: '8px' }}
                    />
                </div>
                <div>
                    <label>Min Price:</label>
                    <input
                        type="text"
                        name="minPrice"
                        value={filters.minPrice}
                        onChange={handleFilterChange}
                        style={{ width: '100%', marginTop: '5px', padding: '8px' }}
                        placeholder="Ex: 20.000"
                    />
                </div>
                <div>
                    <label>Max Price:</label>
                    <input
                        type="text"
                        name="maxPrice"
                        value={filters.maxPrice}
                        onChange={handleFilterChange}
                        style={{ width: '100%', marginTop: '5px', padding: '8px' }}
                        placeholder="Ex: 50.000"
                    />
                </div>
            </div>

            <div style={{ flex: 1 }}>
                {loading ? (
                    <p>Loading paintings...</p>
                ) : (
                    <>
                        <div style={gridContainerStyle}>
                            {filteredPaintings.map((painting) => (
                                <div
                                    key={painting._id}
                                    style={paintingCardStyle}
                                    onClick={() => handleTileClick(painting)}
                                >
                                    <img
                                        src={`data:image/jpeg;base64,${painting.imageData}`}
                                        alt={painting.title}
                                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                    />
                                    <h3>{painting.title}</h3>
                                    <p>Year: {painting.yearCreation}</p>
                                    <p>Price: {painting.price}</p>
                                    <p>Movement: {painting.movement}</p>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleAddToCart(painting);
                                        }}
                                        style={{
                                            backgroundColor: 'green',
                                            color: 'white',
                                            padding: '8px 16px',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            marginTop: '10px',
                                        }}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                                Previous
                            </button>
                            <span>
                                Page {currentPage} of {totalPages}
                            </span>
                            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                                Next
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Paintings;
