import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
  e.preventDefault();

  // Get users from localStorage
  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

  // Check if credentials match
  const user = storedUsers.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    localStorage.setItem("isLoggedIn", "true");
    navigate("/dashboard");
  } else {
    setError("Invalid username or password");
  }
};


  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back</h2>
        <p className="subtitle">Please log in to continue</p>
        
        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <div className="login-links">
          <Link to="/register">Create an account</Link>
          <Link to="/">Return to Homepage</Link>
        </div>
      </div>
    </div>
  );
}
