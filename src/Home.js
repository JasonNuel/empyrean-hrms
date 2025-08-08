import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to EmpyreanHRMS</h1>
      <p>Your futuristic cloud-based human resource management system.</p>
      <Link to="/login" className="home-login-link">Login to Dashboard</Link>
    </div>
  );
}

export default Home;
