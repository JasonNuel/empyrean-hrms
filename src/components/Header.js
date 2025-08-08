import React from 'react';
import './Header.css';
import { FaBell, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const Header = ({ onLogout }) => {
  return (
    <header className="dashboard-header">
      <div className="header-left">
        <h2>Empyrean HRMS</h2>
      </div>

      <div className="header-right">
        <FaBell className="header-icon" />
        <FaUserCircle className="header-icon profile-icon" />
        <button className="logout-button" onClick={onLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
