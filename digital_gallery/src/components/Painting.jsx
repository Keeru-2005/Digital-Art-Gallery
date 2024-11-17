import React, { useEffect, useState } from 'react';
import PaintingDetail from './PaintingDetail';
import Cart from './Cart';

function Paintings() {
    const [paintings, setPaintings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPainting, setSelectedPainting] = useState(null);
    const [cart, setCart] = useState([]);
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
        fetch(`http://localhost:5000/api/paintings?page=${currentPage}&limit=28`)
            .then((response) => response.json())
            .then((data) => {
                setPaintings(data.paintings || []);
                setTotalPages(data.totalPages);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching paintings:', error);
                setLoading(false);
            });
    }, [currentPage]);

    const handleAddToCart = (painting) => {
        setCart((prevCart) => [...prevCart, painting]);
        alert(`${painting.title} has been added to your cart!`);
    };

    const handleRemoveFromCart = (paintingToRemove) => {
        setCart((prevCart) => prevCart.filter(painting => painting._id !== paintingToRemove._id));
    };

    const handleClearCart = () => {
        setCart([]);
    };

    const handleTileClick = (painting) => {
        setSelectedPainting(painting);
    };

    const handleBack = () => {
        setSelectedPainting(null);
    };

    const filteredPaintings = paintings.filter((painting) => {
        const yearMatch = !filters.yearCreation || painting.yearCreation === filters.yearCreation;
        const movementMatch = !filters.movement || painting.movement.toLowerCase().includes(filters.movement.toLowerCase());
        const priceNumber = parseFloat(painting.price.split(' ')[0].replace('.', ''));
        const minPrice = filters.minPrice ? parseFloat(filters.minPrice.replace('.', '')) : null;
        const maxPrice = filters.maxPrice ? parseFloat(filters.maxPrice.replace('.', '')) : null;
        const priceMatch = (minPrice === null || priceNumber >= minPrice) && (maxPrice === null || priceNumber <= maxPrice);

        return yearMatch && movementMatch && priceMatch;
    });

    return (
        <div>
            {/* Cart display */}
            <Cart cart={cart} removeFromCart={handleRemoveFromCart} clearCart={handleClearCart} />

            {/* Painting details */}
            {selectedPainting ? (
                <PaintingDetail painting={selectedPainting} onBack={handleBack} addToCart={handleAddToCart} />
            ) : (
                <div style={{ display: 'flex', margin: '20px' }}>
                    <div style={{ width: '250px', padding: '20px', backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', marginRight: '20px' }}>
                        <h3>Filters</h3>
                        <div>
                            <label>Year of Creation:</label>
                            <input
                                type="text"
                                name="yearCreation"
                                value={filters.yearCreation}
                                onChange={(e) => setFilters({ ...filters, yearCreation: e.target.value })}
                                style={{ width: '100%', marginTop: '5px', padding: '8px' }}
                            />
                        </div>
                        <div>
                            <label>Movement:</label>
                            <input
                                type="text"
                                name="movement"
                                value={filters.movement}
                                onChange={(e) => setFilters({ ...filters, movement: e.target.value })}
                                style={{ width: '100%', marginTop: '5px', padding: '8px' }}
                            />
                        </div>
                        <div>
                            <label>Min Price:</label>
                            <input
                                type="text"
                                name="minPrice"
                                value={filters.minPrice}
                                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                                style={{ width: '100%', marginTop: '5px', padding: '8px' }}
                                placeholder='Ex: 20.000'
                            />
                        </div>
                        <div>
                            <label>Max Price:</label>
                            <input
                                type="text"
                                name="maxPrice"
                                value={filters.maxPrice}
                                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                                style={{ width: '100%', marginTop: '5px', padding: '8px' }}
                                placeholder='Ex: 50.000'
                            />
                        </div>
                    </div>

                    <div style={{ flex: 1 }}>
                        {loading ? (
                            <p>Loading paintings...</p>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                                {filteredPaintings.map((painting) => (
                                    <div
                                        key={painting._id}
                                        style={{
                                            backgroundColor: '#fff',
                                            borderRadius: '8px',
                                            padding: '15px',
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
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Paintings;
