
// import React, { useEffect, useState } from 'react';
// import PhotographDetail from './PhotographDetail'; // Import the detail component

// function Photography() {
//     const [photographies, setPhotographies] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedPhotography, setSelectedPhotography] = useState(null); // Track selected photograph

//     useEffect(() => {
//         setLoading(true);
//         fetch(`http://localhost:5000/api/photographies?page=1&limit=28`)
//             .then((response) => response.json())
//             .then((data) => {
//                 setPhotographies(data.photographyImages || []);
//                 setLoading(false);
//             })
//             .catch((error) => {
//                 console.error('Error fetching photographies:', error);
//                 setLoading(false);
//             });
//     }, []);

//     // Handle tile click and set selected photograph
//     const handleTileClick = (photography) => {
//         setSelectedPhotography(photography); // Set selected photograph
//     };
//     const handleBack = () => {
//         setSelectedPhotography(null);
//     };

//     // Inline styles for reuse
//     const gridContainerStyle = {
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
//         gap: '20px',
//         marginTop: '20px',
//     };

//     const photographyCardStyle = {
//         backgroundColor: '#fff',
//         borderRadius: '8px',
//         padding: '15px',
//         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//         transition: 'transform 0.3s ease',
//         cursor: 'pointer',
//     };

//     const photographyImageStyle = {
//         width: '100%',
//         height: '200px',
//         objectFit: 'cover',
//         borderRadius: '4px',
//     };

//     if (selectedPhotography) {
//         // Render the PhotographDetail component when a tile is clicked
//         return <PhotographDetail photography={selectedPhotography} onBack={handleBack}/>;
//     }

//     return (
//         <div>
//             <h1 style={{ textAlign: 'center', color: 'maroon', margin: '20px 0' }}>Photography Collection</h1>
//             {loading ? (
//                 <p>Loading photographs...</p>
//             ) : (
//                 <div style={gridContainerStyle}>
//                     {photographies.map((photography) => (
//                         <div
//                             style={photographyCardStyle}
//                             key={photography._id}
//                             onClick={() => handleTileClick(photography)}
//                         >
//                             <img
//                                 src={`data:image/jpeg;base64,${photography.imageData}`}
//                                 alt={photography.title}
//                                 style={photographyImageStyle}
//                             />
//                             <h3 style={{ color: 'maroon' }}>{photography.title}</h3>
//                             <p>{photography.copyright}</p>
//                             <p>Price: USD {photography.price}</p>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Photography;

import React, { useEffect, useState } from 'react';
import PhotographDetail from './PhotographDetail'; // Import the detail component

function Photography() {
    const [photographies, setPhotographies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPhotography, setSelectedPhotography] = useState(null); // Track selected photograph
    const [filters, setFilters] = useState({
        minPrice: '',
        maxPrice: '',
    }); // Filters for price

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:5000/api/photographies?page=1&limit=28`)
            .then((response) => response.json())
            .then((data) => {
                setPhotographies(data.photographyImages || []);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching photographies:', error);
                setLoading(false);
            });
    }, []);

    // Filter photographs based on price range
    const filteredPhotographies = photographies.filter((photography) => {
        const priceNumber = parseFloat(photography.price.split(' ')[0].replace('.', '')); // Extract numeric price
        const minPrice = filters.minPrice ? parseFloat(filters.minPrice.replace('.', '')) : null;
        const maxPrice = filters.maxPrice ? parseFloat(filters.maxPrice.replace('.', '')) : null;

        return (
            (minPrice === null || priceNumber >= minPrice) &&
            (maxPrice === null || priceNumber <= maxPrice)
        );
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const handleTileClick = (photography) => {
        setSelectedPhotography(photography); // Set selected photograph
    };

    const handleBack = () => {
        setSelectedPhotography(null);
    };

    // Inline styles
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
        marginTop: '20px',
    };

    const photographyCardStyle = {
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease',
        cursor: 'pointer',
    };

    const photographyImageStyle = {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        borderRadius: '4px',
    };

    if (selectedPhotography) {
        // Render the PhotographDetail component when a tile is clicked
        return <PhotographDetail photography={selectedPhotography} onBack={handleBack} />;
    }

    return (
        <div style={{ display: 'flex', margin: '20px' }}>
            {/* Sidebar for filters */}
            <div style={sidebarStyle}>
                <h3>Filter by Price</h3>
                <div>
                    <label>Min Price (e.g., 3.550):</label>
                    <input
                        type="text"
                        name="minPrice"
                        value={filters.minPrice}
                        onChange={handleFilterChange}
                        style={{ width: '100%', marginTop: '5px', padding: '8px' }}
                    />
                </div>
                <div>
                    <label>Max Price (e.g., 7.890):</label>
                    <input
                        type="text"
                        name="maxPrice"
                        value={filters.maxPrice}
                        onChange={handleFilterChange}
                        style={{ width: '100%', marginTop: '5px', padding: '8px' }}
                    />
                </div>
            </div>

            {/* Photographs Grid */}
            <div style={{ flex: 1 }}>
                <h1 style={{ textAlign: 'center', color: 'maroon', margin: '20px 0' }}>
                    Photography Collection
                </h1>
                {loading ? (
                    <p>Loading photographs...</p>
                ) : (
                    <div style={gridContainerStyle}>
                        {filteredPhotographies.map((photography) => (
                            <div
                                style={photographyCardStyle}
                                key={photography._id}
                                onClick={() => handleTileClick(photography)}
                            >
                                <img
                                    src={`data:image/jpeg;base64,${photography.imageData}`}
                                    alt={photography.title}
                                    style={photographyImageStyle}
                                />
                                <h3 style={{ color: 'maroon' }}>{photography.title}</h3>
                                <p>{photography.copyright}</p>
                                <p>Price: {photography.price}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Photography;
