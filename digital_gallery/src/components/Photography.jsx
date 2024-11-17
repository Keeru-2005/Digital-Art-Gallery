
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';


// function Photography() {
//   const navigate = useNavigate();

//   const handleTileClick = (id) => {
//       navigate(`/photography/${id}`);
//   };


//     const [photographies, setPhotographies] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [loading, setLoading] = useState(true); 

//     useEffect(() => {
//       setLoading(true); // Set loading to true before fetch starts
  
//       fetch(`http://localhost:5000/api/photographies?page=${currentPage}&limit=28`)
//           .then((response) => response.json())
//           .then((data) => {
//               console.log("API Data:", data); // Log the API response
//               setPhotographies(data.photographyImages || []); // Update state
//               setTotalPages(data.totalPages || 1);
//               setLoading(false); // Stop loading spinner
//           })
//           .catch((error) => {
//               console.error('Error fetching photographies:', error);
//               setLoading(false); // Stop loading spinner in case of error
//           });
//   }, [currentPage]);
  

//     // Change page
//     const handlePageChange = (page) => {
//         setCurrentPage(page);
//     };

//     // Inline Styles
//     const containerStyle = {
//         display: 'flex',
//         justifyContent: 'space-between',
//         margin: '0 20px',
//     };

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
//     };

//     const photographyImageStyle = {
//         width: '100%',
//         height: '200px',
//         objectFit: 'cover',
//         borderRadius: '4px',
//     };

//     const photographyInfoStyle = {
//         marginTop: '10px',
//     };

//     const paginationButtonStyle = {
//         padding: '10px 20px',
//         backgroundColor: 'maroon',
//         color: 'white',
//         border: 'none',
//         borderRadius: '4px',
//         cursor: 'pointer',
//         transition: 'background-color 0.3s ease',
//     };

//     const paginationStyle = {
//         textAlign: 'center',
//         marginTop: '20px',
//     };

//     const paginationDisabledButtonStyle = {
//         backgroundColor: '#ccc',
//         cursor: 'not-allowed',
//     };

//     return (
//         // <div>
//         //     <h1 style={{ textAlign: 'center', color: 'maroon', margin: '20px 0' }}>Photography Collection</h1>

//         //     <div style={containerStyle}>
//         //         {/* Photography List */}
//         //         <div style={{ flex: 1 }}>
//         //             {loading ? (
//         //                 <p>Loading photographs...</p>  // Loading state
//         //             ) : (
//         //                 <div style={gridContainerStyle}>

//         //                     {photographies.length === 0 ? (
//         //                         <p>No photographs found.</p>
//         //                     ) : (
//         //                         photographies.map((photography) => (
//         //                             <div style={photographyCardStyle} key={photography._id}>
//         //                                 <img
//         //                                     src={`data:image/jpeg;base64,${photography.imageData}`}
//         //                                     alt={photography.title}
//         //                                     style={photographyImageStyle}
//         //                                 />
//         //                                 <div style={photographyInfoStyle}>
//         //                                     <h3 style={{ color: 'maroon' }}>{photography.title}</h3>
//         //                                     <p>{photography.copyright}</p>
//         //                                     <p>Price: {photography.price}</p>
//         //                                     {/* <p>Date: {new Date(photography.date).toLocaleDateString()}</p> */}
                                            
//         //                                 </div>
//         //                             </div>
//         //                         ))
//         //                     )
//         //                     }
//         //                 </div>
//         //             )}

//         //             {/* Pagination */}
//         //             <div style={paginationStyle}>
//         //                 <button
//         //                     onClick={() => handlePageChange(currentPage - 1)}
//         //                     disabled={currentPage === 1}
//         //                     style={{
//         //                         ...paginationButtonStyle,
//         //                         ...(currentPage === 1 ? paginationDisabledButtonStyle : {}),
//         //                     }}
//         //                 >
//         //                     Previous
//         //                 </button>
//         //                 <span>{` Page ${currentPage} of ${totalPages} `}</span>
//         //                 <button
//         //                     onClick={() => handlePageChange(currentPage + 1)}
//         //                     disabled={currentPage === totalPages}
//         //                     style={{
//         //                         ...paginationButtonStyle,
//         //                         ...(currentPage === totalPages ? paginationDisabledButtonStyle : {}),
//         //                     }}
//         //                 >
//         //                     Next
//         //                 </button>
//         //             </div>
//         //         </div>
//         //     </div>
//         // </div>
//         //------------------------------------------------------------------------------------------------
//         <div>
//             <h1 style={{ textAlign: 'center', color: 'maroon', margin: '20px 0' }}>Photography Collection</h1>
//             <div style={gridContainerStyle}>
//                 {photographies.map((photography) => (
//                     <div
//                         style={photographyCardStyle}
//                         key={photography._id}
//                         onClick={() => handleTileClick(photography._id)}
//                     >
                      
//                         <img
//                             src={`data:image/jpeg;base64,${photography.imageData}`}
//                             alt={photography.title}
//                             style={photographyImageStyle}
//                         />
//                         <div style={photographyInfoStyle}>
//                             <h3 style={{ color: 'maroon' }}>{photography.title}</h3>
//                             <p>{photography.copyright}</p>
//                             <p>Price: {photography.price}</p>
//                         </div>
//                     </div>
//                 ))}
                
//             </div>
//         </div>
//     );
// }

// export default Photography;

// Import necessary hooks and modules
import React, { useEffect, useState } from 'react';
import PhotographDetail from './PhotographDetail'; // Import the detail component

function Photography() {
    const [photographies, setPhotographies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPhotography, setSelectedPhotography] = useState(null); // Track selected photograph

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

    // Handle tile click and set selected photograph
    const handleTileClick = (photography) => {
        setSelectedPhotography(photography); // Set selected photograph
    };

    // Inline styles for reuse
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
        return <PhotographDetail photography={selectedPhotography} />;
    }

    return (
        <div>
            <h1 style={{ textAlign: 'center', color: 'maroon', margin: '20px 0' }}>Photography Collection</h1>
            {loading ? (
                <p>Loading photographs...</p>
            ) : (
                <div style={gridContainerStyle}>
                    {photographies.map((photography) => (
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
                            <p>Price: USD {photography.price}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Photography;
