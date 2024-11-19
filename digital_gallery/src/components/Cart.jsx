// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function Cart() {
//     const [cartItems, setCartItems] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchCartItems = async () => {
//             try {
//                 // Fetch cart items from the backend
//                 const response = await axios.get('http://localhost:5000/api/cart');
//                 if (response.data && response.data.cartItems) {
//                     setCartItems(response.data.cartItems);
//                 }
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching cart items:', error);
//                 setLoading(false);
//             }
//         };

//         fetchCartItems();
//     }, []);

//     if (loading) {
//         return <p>Loading cart...</p>;
//     }

//     return (
//         <div style={{ padding: '20px' }}>
//             {cartItems.length === 0 ? (
//                 <p>Your cart is empty.</p>
//             ) : (
//                 <div>
//                     <h2>Your Cart</h2>
//                     <ul>
//                         {cartItems.map((item) => (
//                             <li key={item._id} style={{ marginBottom: '20px' }}>
//                                 <img
//                                     src={data:image/jpeg;base64,${item.imageData}}
//                                     alt={item.title}
//                                     style={{ width: '100px', height: '100px', objectFit: 'cover' }}
//                                 />
//                                 <div>
//                                     <h3>{item.title}</h3>
//                                     <p><strong>Artist:</strong> {item.artist}</p>
//                                     <p><strong>Price:</strong> ${item.price}</p>
//                                 </div>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Cart;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function Cart() {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCartItems = async () => {
//       try {
//         // Fetch cart items from the backend
//         const response = await axios.get('http://localhost:5000/api/cart');
//         if (response.data && response.data.cartItems) {
//           setCartItems(response.data.cartItems);
//         }
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching cart items:', error);
//         setLoading(false);
//       }
//     };

//     fetchCartItems();
//   }, []);

//   if (loading) {
//     return <p>Loading cart...</p>;
//   }

//   return (
//     <div style={{ padding: '20px' }}>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <div>
//           <h2>Your Cart</h2>
//           <ul>
//             {cartItems.map((item) => (
//               <li key={item._id} style={{ marginBottom: '20px' }}>
//                 {item.type === 'painting' ? (
//                   <div>
//                     <img
//                       src={data:image/jpeg;base64,${item.imageData}}
//                       alt={item.title}
//                       style={{ width: '100px', height: '100px', objectFit: 'cover' }}
//                     />
//                     <div>
//                       <h3>{item.title}</h3>
//                       <p><strong>Artist:</strong> {item.artist}</p>
//                       <p><strong>Price:</strong> ${item.price}</p>
//                     </div>
//                   </div>
//                 ) : (
//                   <div>
//                     <img
//                       src={data:image/jpeg;base64,${item.imageData}}
//                       alt={item.title}
//                       style={{ width: '100px', height: '100px', objectFit: 'cover' }}
//                     />
//                     <div>
//                       <h3>{item.title}</h3>
//                       <p><strong>Price:</strong> ${item.price}</p>
//                     </div>
//                   </div>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Cart;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        // Fetch cart items from the backend
        const response = await axios.get('http://localhost:5000/api/cart');
        if (response.data && response.data.cartItems) {
          setCartItems(response.data.cartItems);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  if (loading) {
    return <p>Loading cart...</p>;
  }

  // Calculate the total price of all items in the cart
  const totalAmount = cartItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);

  return (
    <div style={{ padding: '20px' }}>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <h2>Your Cart</h2>
          <div style={styles.gridContainer}>
            {cartItems.map((item) => (
              <div key={item._id} style={styles.gridItem}>
                {item.type === 'painting' ? (
                  <div>
                    <img
                      src={`data:image/jpeg;base64,${item.imageData}`}
                      alt={item.title}
                      style={styles.image}
                    />
                    <div>
                      <h3>{item.title}</h3>
                      <p><strong>Artist:</strong> {item.artist}</p>
                      <p><strong>Price:</strong> ${item.price}</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <img
                      src={`data:image/jpeg;base64,${item.imageData}`}
                      alt={item.title}
                      style={styles.image}
                    />
                    <div>
                      <h3>{item.title}</h3>
                      <p><strong>Price:</strong> ${item.price}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={styles.totalContainer}>
            <h3>Total Amount: ${totalAmount}</h3>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',  // Create a responsive grid
    gap: '20px',
    marginTop: '20px',
  },
  gridItem: {
    border: '1px solid #ddd',
    padding: '10px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '4px',
  },
  totalContainer: {
    marginTop: '20px',
    textAlign: 'right',
    fontWeight: 'bold',
  },
};

export default Cart;