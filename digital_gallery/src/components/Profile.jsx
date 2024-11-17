import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // For navigation after successful login or signup

function ProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "", name: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [user, setUser] = useState(null);  // State for user details
  const [cartItems, setCartItems] = useState([]); // State for cart items
  const history = useNavigate();  // Use this to navigate to another page after successful login/signup

  // Fetch user data from localStorage after component mounts
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setIsLoggedIn(true);
    }
    
    // Example for fetching cart items (if needed)
    // You can replace this with your actual logic to fetch cart items from the backend or use a mock array.
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || []; 
    setCartItems(storedCartItems);
  }, []); // Empty dependency array means this effect runs only once after the first render

  // Handle input changes
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email: credentials.email,
        password: credentials.password,
      });
      
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user)); // Store user in localStorage
      setUser(user); // Set user in state
      setIsLoggedIn(true);
      setSuccess("Login successful!");
      setTimeout(() => {
        history("/profile");
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Login failed!");
    }
  };

  // Handle signup submission
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      });
      
      setIsSignup(false);
      setSuccess("Signup successful! Please login.");
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed!");
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cartItems"); // Clear cart items if logged out
    setIsLoggedIn(false);
    setUser(null); // Clear user state
    setCartItems([]); // Clear cart items
  };

  return (
    <div style={{ fontFamily: "Arial", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      {isLoggedIn ? (
        // Full-page Profile Section after login
        <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "100%", padding: "40px", boxSizing: "border-box" }}>
      
          {/* Left Side - User's Cart */}
          <div style={{ flex: 1, marginRight: "20px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <h3>Your Cart</h3>
            {/* Here you can map through cart items */}
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <ul>
                {cartItems.map((item, index) => (
                  <li key={index}>{item.name} - ${item.price}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Right Side - User Details */}
          <div style={{ flex: 1, padding: "20px", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <h3>Your Details</h3>
            {user ? (
              <>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
              </>
            ) : (
              <p>Loading user details...</p>
            )}
            {/* Add Logout Button */}
            <button onClick={handleLogout} style={{ padding: "10px", marginTop: "20px", borderRadius: "4px", backgroundColor: "#f44336", color: "#fff", fontWeight: "bold", cursor: "pointer" }}>
              Logout
            </button>
          </div>
        </div>
      ) : isSignup ? (
        // Signup Form
        <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "15px", width: "300px", padding: "30px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#fff", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
          <h2 style={{ textAlign: "center" }}>Signup</h2>
          {error && <div style={{ color: "red" }}>{error}</div>}
          {success && <div style={{ color: "green" }}>{success}</div>}
          <div>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Name:</label>
            <input
              type="text"
              name="name"
              value={credentials.name}
              onChange={handleChange}
              style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
              required
            />
          </div>
          <div>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Email:</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
              required
            />
          </div>
          <div>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Password:</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
              required
            />
          </div>
          <button type="submit" style={{ padding: "10px", borderRadius: "4px", backgroundColor: "#4CAF50", color: "#fff", fontWeight: "bold", cursor: "pointer" }}>
            Signup
          </button>
          <p style={{ textAlign: "center", cursor: "pointer" }} onClick={() => setIsSignup(false)}>
            Already have an account? Login here.
          </p>
        </form>
      ) : (
        // Login Form
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px", width: "300px", padding: "30px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#fff", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
          <h2 style={{ textAlign: "center" }}>Login</h2>
          {error && <div style={{ color: "red" }}>{error}</div>}
          {success && <div style={{ color: "green" }}>{success}</div>}
          <div>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Email:</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
              required
            />
          </div>
          <div>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Password:</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
              required
            />
          </div>
          <button type="submit" style={{ padding: "10px", borderRadius: "4px", backgroundColor: "#4CAF50", color: "#fff", fontWeight: "bold", cursor: "pointer" }}>
            Login
          </button>
          <p style={{ textAlign: "center", cursor: "pointer" }} onClick={() => setIsSignup(true)}>
            Don't have an account? Signup here.
          </p>
        </form>
      )}
    </div>
  );
}

export default ProfilePage;
