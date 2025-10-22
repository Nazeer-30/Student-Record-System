import React, { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password,
      });
      if (res.data.success) {
        alert("Login successful!");
        onLogin();
      }
    } catch (err) {
      alert("Invalid credentials or server error!");
    }
  };

  return (
    <section className="login-section">
      <div className="login-container">
        <h1>Admin Login</h1><br /><br />
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
