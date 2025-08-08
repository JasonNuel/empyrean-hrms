import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"; // Reuse the same styles for consistency

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Get existing users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if username already exists
    if (storedUsers.find((user) => user.username === username)) {
      setError("Username already exists");
      return;
    }

    // Save new user
    const updatedUsers = [...storedUsers, { username, password }];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setSuccess("Account created successfully! Redirecting to login...");
    setError("");

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Create Account</h2>
        <p className="subtitle">Fill in your details to register</p>

        {error && <div className="error-msg">{error}</div>}
        {success && <div className="success-msg">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Register
          </button>
        </form>

        <div className="login-links">
          <Link to="/login">Already have an account? Login</Link>
          <Link to="/">Return to Homepage</Link>
        </div>
      </div>
    </div>
  );
}
