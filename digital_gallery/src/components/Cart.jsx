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

    return (
        <div style={{ padding: '20px' }}>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <h2>Your Cart</h2>
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item._id} style={{ marginBottom: '20px' }}>
                                <img
                                    src={`data:image/jpeg;base64,${item.imageData}`}
                                    alt={item.title}
                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                />
                                <div>
                                    <h3>{item.title}</h3>
                                    <p><strong>Artist:</strong> {item.artist}</p>
                                    <p><strong>Price:</strong> ${item.price}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Cart;
