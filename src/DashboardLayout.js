// src/pages/DashboardLayout.js
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Dashboard from './Dashboard';

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`layout ${collapsed ? 'collapsed' : ''}`}>
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
      <div className="main-content">
        <Dashboard />
      </div>
    </div>
  );
};

export default DashboardLayout;
