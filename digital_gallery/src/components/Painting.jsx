// import React, { useEffect, useState } from 'react';
// import PaintingDetail from './PaintingDetail';
// function Paintings() {
//     const [paintings, setPaintings] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedPainting, setSelectedPainting] = useState(null); // Selected painting

//     const [filters, setFilters] = useState({
//         yearCreation: '',
//         movement: '',
//         minPrice: '',
//         maxPrice: '',
//     });

//     useEffect(() => {
//         setLoading(true);

//         const queryParams = new URLSearchParams({
//             page: 1,
//             limit: 28,
//             ...(filters.yearCreation && { yearCreation: filters.yearCreation }),
//             ...(filters.movement && { movement: filters.movement }),
//             ...(filters.minPrice && { minPrice: filters.minPrice }),
//             ...(filters.maxPrice && { maxPrice: filters.maxPrice }),
//         }).toString();

//         fetch(`http://localhost:5000/api/paintings?${queryParams}`)
//             .then((response) => response.json())
//             .then((data) => {
//                 setPaintings(data.paintings || []);
//                 setLoading(false);
//             })
//             .catch((error) => {
//                 console.error('Error fetching paintings:', error);
//                 setLoading(false);
//             });
//     }, [filters]);

//     const handleFilterChange = (e) => {
//         const { name, value } = e.target;
//         setFilters((prevFilters) => ({
//             ...prevFilters,
//             [name]: value,
//         }));
//     };

//     const handleTileClick = (painting) => {
//         setSelectedPainting(painting);
//     };

//     const handleBack = () => {
//         setSelectedPainting(null);
//     };

//     const sidebarStyle = {
//         width: '250px',
//         padding: '20px',
//         backgroundColor: '#fff',
//         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//         borderRadius: '8px',
//         marginRight: '20px',
//     };

//     const gridContainerStyle = {
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
//         gap: '20px',
//     };

//     const paintingCardStyle = {
//         backgroundColor: '#fff',
//         borderRadius: '8px',
//         padding: '15px',
//         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//         cursor: 'pointer',
//     };

//     if (selectedPainting) {
//         return <PaintingDetail painting={selectedPainting} onBack={handleBack} />;
//     }

//     return (
//         <div style={{ display: 'flex', margin: '20px' }}>
//             <div style={sidebarStyle}>
//                 <h3>Filters</h3>
//                 <div>
//                     <label>Year of Creation:</label>
//                     <input
//                         type="number"
//                         name="yearCreation"
//                         value={filters.yearCreation}
//                         onChange={handleFilterChange}
//                         style={{ width: '100%', marginTop: '5px', padding: '8px' }}
//                     />
//                 </div>
//                 <div>
//                     <label>Movement:</label>
//                     <input
//                         type="text"
//                         name="movement"
//                         value={filters.movement}
//                         onChange={handleFilterChange}
//                         style={{ width: '100%', marginTop: '5px', padding: '8px' }}
//                     />
//                 </div>
//                 <div>
//                     <label>Min Price:</label>
//                     <input
//                         type="number"
//                         name="minPrice"
//                         value={filters.minPrice}
//                         onChange={handleFilterChange}
//                         style={{ width: '100%', marginTop: '5px', padding: '8px' }}
//                     />
//                 </div>
//                 <div>
//                     <label>Max Price:</label>
//                     <input
//                         type="number"
//                         name="maxPrice"
//                         value={filters.maxPrice}
//                         onChange={handleFilterChange}
//                         style={{ width: '100%', marginTop: '5px', padding: '8px' }}
//                     />
//                 </div>
//             </div>

//             <div style={{ flex: 1 }}>
//                 {loading ? (
//                     <p>Loading paintings...</p>
//                 ) : (
//                     <div style={gridContainerStyle}>
//                         {paintings.map((painting) => (
//                             <div
//                                 key={painting._id}
//                                 style={paintingCardStyle}
//                                 onClick={() => handleTileClick(painting)}
//                             >
//                                 <img
//                                     src={`data:image/jpeg;base64,${painting.imageData}`}
//                                     alt={painting.title}
//                                     style={{ width: '100%', height: '200px', objectFit: 'cover' }}
//                                 />
//                                 <h3>{painting.title}</h3>
//                                 <p>Year: {painting.yearCreation}</p>
//                                 <p>Price: {painting.price}</p>
//                                 <p>Movement: {painting.movement}</p>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Paintings;

import React, { useEffect, useState } from 'react';
import PaintingDetail from './PaintingDetail';

function Paintings() {
    const [paintings, setPaintings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPainting, setSelectedPainting] = useState(null); // Selected painting

    const [filters, setFilters] = useState({
        yearCreation: '',
        movement: '',
        minPrice: '',
        maxPrice: '',
    });

    useEffect(() => {
        setLoading(true);

        fetch(`http://localhost:5000/api/paintings?page=1&limit=28`)
            .then((response) => response.json())
            .then((data) => {
                setPaintings(data.paintings || []);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching paintings:', error);
                setLoading(false);
            });
    }, []);

    // Apply filters
    const filteredPaintings = paintings.filter((painting) => {
        // Filter by year
        const yearMatch =
            !filters.yearCreation || painting.yearCreation === filters.yearCreation;

        // Filter by movement (case-insensitive)
        const movementMatch =
            !filters.movement ||
            painting.movement.toLowerCase().includes(filters.movement.toLowerCase());

        // Extract numeric price
        const priceNumber = parseFloat(painting.price.split(' ')[0].replace('.', ''));

        // Convert min/max price to numeric
        const minPrice = filters.minPrice ? parseFloat(filters.minPrice.replace('.', '')) : null;
        const maxPrice = filters.maxPrice ? parseFloat(filters.maxPrice.replace('.', '')) : null;

        // Filter by price range
        const priceMatch =
            (minPrice === null || priceNumber >= minPrice) &&
            (maxPrice === null || priceNumber <= maxPrice);

        return yearMatch && movementMatch && priceMatch;
    });

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
                    />
                </div>
            </div>

            <div style={{ flex: 1 }}>
                {loading ? (
                    <p>Loading paintings...</p>
                ) : (
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
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Paintings;
