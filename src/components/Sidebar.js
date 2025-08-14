// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import {
  FaTachometerAlt,
  FaUserCheck,
  FaUsers,
  FaCalendarCheck,
  FaMoneyCheckAlt,
  FaChartLine,
  FaQuestionCircle,
  FaBars,
} from 'react-icons/fa';

const Sidebar = ({ isCollapsed, toggleSidebar, mobileActive, toggleMobileSidebar }) => {
  const menuItems = [
    { label: 'Dashboard', icon: <FaTachometerAlt />, path: '/dashboard' },
    { label: 'Onboarding', icon: <FaUserCheck />, path: '/onboarding' },
    { label: 'Employee', icon: <FaUsers />, path: '/employee' },
    { label: 'Attendance', icon: <FaCalendarCheck />, path: '/attendance' },
    { label: 'Payroll', icon: <FaMoneyCheckAlt />, path: '/payroll' },
    { label: 'Performance', icon: <FaChartLine />, path: '/performance' },
    { label: 'Helpdesk', icon: <FaQuestionCircle />, path: '/helpdesk' },
  ];

  return (
    <>
      <div className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${mobileActive ? 'active' : ''}`}>
        <div className="sidebar-header">
          <button className="toggle-button" onClick={toggleSidebar}>
            <FaBars />
          </button>
          {!isCollapsed && <h2 className="logo-text">EmpyreanHRMS</h2>}
        </div>

        <ul className="sidebar-menu">
          {menuItems.map((item, idx) => (
            <li key={idx} className="sidebar-item">
              <Link to={item.path} className="sidebar-link" onClick={mobileActive ? toggleMobileSidebar : undefined}>
                <span className="icon">{item.icon}</span>
                {!isCollapsed && <span className="label">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay for mobile when sidebar is active */}
      {mobileActive && <div className="overlay" onClick={toggleMobileSidebar}></div>}
    </>
  );
};

export default Sidebar;
