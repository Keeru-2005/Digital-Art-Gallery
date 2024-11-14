import React, { useState } from "react";

function ProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  // Handle input change
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  // Handle login submission
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true); // Assume login is successful
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
          </div>

          {/* Art Section */}
          <div style={{ flex: 1, backgroundColor: "#eee", padding: "20px", borderRadius: "8px" }}>
            <h2 style={{ fontWeight: "bold" }}>Your Art</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
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
                  <span> Alex Smith</span>
                  <br />
                  <label style={{ fontWeight: "bold" }}>Cost:</label>
                  <span> $750</span>
                  <br />
                  <label style={{ fontWeight: "bold" }}>Dimensions:</label>
                  <span> 30" x 40"</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Centered Login Form before login
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
          <button type="submit" style={{ padding: "10px", borderRadius: "4px", backgroundColor: "#4CAF50", color: "#fff", fontWeight: "bold", cursor: "pointer" }}>
            Login
          </button>
        </form>
      )}
    </div>
  );
}

export default ProfilePage;
