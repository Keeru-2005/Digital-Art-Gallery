import React, { useState } from "react";
import axios from "axios";

function ProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "", name: "" });
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Handle input change
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
      localStorage.setItem("token", response.data.token); // Save JWT token in localStorage
      setToken(response.data.token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  // Handle signup submission
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/signup", {
        email: credentials.email,
        password: credentials.password,
        name: credentials.name,
      });
      setIsSignup(false); // Switch to login form after successful signup
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsLoggedIn(false);
  };

  return (
    <div style={{ fontFamily: "Arial", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      {isLoggedIn ? (
        // Full-page Profile Section after login
        <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "100%", padding: "40px", boxSizing: "border-box" }}>
          <div style={{ flex: 1, paddingRight: "20px" }}>
            <h2 style={{ fontWeight: "bold" }}>Your Profile</h2>
            <div
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                backgroundColor: "#ccc",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "50px",
                color: "#333",
                marginBottom: "20px",
              }}
            >
              <i className="fas fa-user"></i>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ fontWeight: "bold" }}>Name: </label>
              <span>John Doe</span>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ fontWeight: "bold" }}>Email Id: </label>
              <span>{credentials.email}</span>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ fontWeight: "bold" }}>Phone no: </label>
              <span>+1234567890</span>
            </div>
            <button
              onClick={handleLogout}
              style={{
                padding: "10px",
                borderRadius: "4px",
                backgroundColor: "#f44336",
                color: "#fff",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>

          {/* Art Section */}
          <div style={{ flex: 1, backgroundColor: "#eee", padding: "20px", borderRadius: "8px" }}>
            <h2 style={{ fontWeight: "bold" }}>Your Art</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Add dynamic art display based on fetched data */}
              <div style={{ display: "flex", alignItems: "flex-start" }}>
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    backgroundColor: "#ccc",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "24px",
                    color: "#333",
                    marginRight: "10px",
                  }}
                >
                  <i className="fas fa-image"></i>
                </div>
                <div style={{ marginLeft: "10px" }}>
                  <label style={{ fontWeight: "bold" }}>Artist:</label>
                  <span> Jane Doe</span>
                  <br />
                  <label style={{ fontWeight: "bold" }}>Cost:</label>
                  <span> $500</span>
                  <br />
                  <label style={{ fontWeight: "bold" }}>Dimensions:</label>
                  <span> 24" x 36"</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : isSignup ? (
        // Signup Form
        <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "15px", width: "300px", padding: "30px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#fff", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
          <h2 style={{ textAlign: "center", fontWeight: "bold" }}>Signup</h2>
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
          <button
            type="submit"
            style={{
              padding: "10px",
              borderRadius: "4px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Signup
          </button>
          <p style={{ textAlign: "center", cursor: "pointer" }} onClick={() => setIsSignup(false)}>
            Already have an account? Login here.
          </p>
        </form>
      ) : (
        // Login Form
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px", width: "300px", padding: "30px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#fff", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
          <h2 style={{ textAlign: "center", fontWeight: "bold" }}>Login</h2>
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
          <button
            type="submit"
            style={{
              padding: "10px",
              borderRadius: "4px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
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
