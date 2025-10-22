import React, { useState } from "react";
import axios from "axios";

// --- CRITICAL CHANGE 1: Define the API base URL ---
// This variable will use the URL you set in the Render environment variables.
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
// ---------------------------------------------------

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // State to handle error and success messages
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous message
    setMessageType("");

    try {
      // --- CRITICAL CHANGE 2: Use the dynamic API_BASE_URL ---
      const res = await axios.post(`${API_BASE_URL}/api/admin/login`, {
        email,
        password,
      });
      // ---------------------------------------------------

      if (res.data.success) {
        setMessage("Login successful!");
        setMessageType("success");
        // Delay navigation slightly to let user see success message
        setTimeout(onLogin, 500); 
      } else {
        // If the server returns success: false
        setMessage("Invalid email or password.");
        setMessageType("error");
      }
    } catch (err) {
      // If the network request fails (e.g., server down or wrong URL)
      setMessage("Login failed. Check server connection or credentials.");
      setMessageType("error");
      console.error("Login Error:", err);
    }
  };

  return (
    <section className="login-section">
      <div className="login-container">
        <h1>Admin Login</h1>
        <br />
        <br />
        
        {/* --- CRITICAL CHANGE 3: Display message instead of alert() --- */}
        {message && (
          <p className={`message ${messageType === 'success' ? 'text-green-500' : 'text-red-500'} mb-4 font-semibold`}>
            {message}
          </p>
        )}
        {/* ----------------------------------------------------------- */}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email (admin@gmail.com)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          /><br /><br />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password (admin@1234)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="show-password">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showPassword">
              Show Password
            </label>
          </div>
          <br />

          <button type="submit" className="loginbtn">Login</button>
        </form>
      </div>
    </section>
  );
}

export default Login;
