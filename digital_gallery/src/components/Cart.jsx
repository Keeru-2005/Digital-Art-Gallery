import React from 'react';
import { useLocation } from 'react-router-dom';

function Cart({ cart, removeFromCart, clearCart }) {
    const totalPrice = cart.reduce((acc, painting) => acc + parseFloat(painting.price.replace(',', '').replace('$', '')), 0);

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ color: 'maroon' }}>Your Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty. Add some paintings to your cart!</p>
            ) : (
                <div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        {cart.map((painting, index) => (
                            <div
                                key={index}
                                style={{
                                    width: '250px',
                                    padding: '10px',
                                    backgroundColor: '#fff',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    textAlign: 'center',
                                }}
                            >
                                <img
                                    src={`data:image/jpeg;base64,${painting.imageData}`}
                                    alt={painting.title}
                                    style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
                                />
                                <h3>{painting.title}</h3>
                                <p>{painting.artist}</p>
                                <p>{painting.price}</p>
                                <button
                                    style={{
                                        backgroundColor: 'red',
                                        color: 'white',
                                        padding: '5px 10px',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => removeFromCart(painting)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <h3 style={{ color: 'maroon' }}>Cart Summary</h3>
                        <p>Total Price: ${totalPrice.toFixed(2)}</p>
                        <div>
                            <button
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: 'maroon',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    marginRight: '10px',
                                }}
                                onClick={clearCart}
                            >
                                Clear Cart
                            </button>
                            <button
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: 'green',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
