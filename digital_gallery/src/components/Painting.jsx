import React, { useEffect, useState } from 'react';
import PaintingDetail from './PaintingDetail';
import axios from 'axios';

function Paintings() {
    const [paintings, setPaintings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPainting, setSelectedPainting] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [filters, setFilters] = useState({
        yearCreation: '',
        movement: '',
        minPrice: '',
        maxPrice: '',
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        setLoading(true);

        axios
            .get(`http://localhost:5000/api/paintings?page=${currentPage}&limit=28`)
            .then((response) => {
                const data = response.data;
                setPaintings(data.paintings || []);
                setTotalPages(data.totalPages || 1);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching paintings:', error);
                setLoading(false);
            });
    }, [currentPage]);

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
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleAddToCart = async (painting) => {
        const userId = '12345'; // Replace with the actual logged-in user ID
        try {
            const response = await axios.post('http://localhost:5000/api/add', {
                userId,
                paintingId: painting._id,
            });
            setCartItems(response.data.cartItems);
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Failed to add to cart. Please try again.');
        }
    };

    // Apply filters
    const filteredPaintings = paintings.filter((painting) => {
        const yearMatch = !filters.yearCreation || painting.yearCreation === filters.yearCreation;
        const movementMatch =
            !filters.movement || painting.movement.toLowerCase().includes(filters.movement.toLowerCase());
        const priceNumber = parseFloat(painting.price.split(' ')[0].replace('.', ''));
        const minPrice = filters.minPrice ? parseFloat(filters.minPrice.replace('.', '')) : null;
        const maxPrice = filters.maxPrice ? parseFloat(filters.maxPrice.replace('.', '')) : null;
        const priceMatch = (minPrice === null || priceNumber >= minPrice) && (maxPrice === null || priceNumber <= maxPrice);
        return yearMatch && movementMatch && priceMatch;
    });

    if (selectedPainting) {
        return <PaintingDetail painting={selectedPainting} onBack={handleBack} />;
    }

    return (
        <div style={{ display: 'flex', padding: '20px' }}>
            {/* Sidebar */}
            <div style={{ width: '250px', marginRight: '20px' }}>
                <h3>Filters</h3>
                {['yearCreation', 'movement', 'minPrice', 'maxPrice'].map((filter) => (
                    <div key={filter} style={{ marginBottom: '15px' }}>
                        <label>
                            {filter === 'minPrice' || filter === 'maxPrice'
                                ? `Price (${filter === 'minPrice' ? 'Min' : 'Max'})`
                                : filter.charAt(0).toUpperCase() + filter.slice(1)}:
                        </label>
                        <input
                            type="text"
                            name={filter}
                            value={filters[filter]}
                            onChange={handleFilterChange}
                            style={{ width: '100%', marginTop: '5px', padding: '8px' }}
                        />
                    </div>
                ))}
            </div>

            {/* Paintings Grid */}
            <div style={{ flex: 1 }}>
                {loading ? (
                    <p>Loading paintings...</p>
                ) : (
                    <>
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                                gap: '20px',
                            }}
                        >
                            {filteredPaintings.map((painting) => (
                                <div
                                    key={painting._id}
                                    style={{
                                        backgroundColor: '#fff',
                                        padding: '15px',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                        cursor: 'pointer',
                                    }}
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
                                    
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div style={{ marginTop: '20px', textAlign: 'center' }}>
                            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                                Previous
                            </button>
                            <span style={{ margin: '0 15px' }}>
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
