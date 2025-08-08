import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import Attendance from './pages/Attendance';
import Employee from './pages/Employee';
import Payroll from './pages/Payroll';
import Performance from './pages/Performance';
import Helpdesk from './pages/Helpdesk';

import './App.css';

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Local authentication check
  useEffect(() => {
    const publicPages = ['/', '/login', '/register'];
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn && !publicPages.includes(location.pathname)) {
      navigate('/login');
    }
  }, [location.pathname, navigate]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  const isPublicPage = ['/login', '/', '/register'].includes(location.pathname);

  return (
    <div className="app-container">
      {!isPublicPage && (
        <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      )}

      <div className={`main-content ${isCollapsed ? 'collapsed' : ''}`}>
        {!isPublicPage && <Header onLogout={handleLogout} />}

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Authenticated Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/helpdesk" element={<Helpdesk />} />
        </Routes>

        {!isPublicPage && <Footer />}
      </div>
    </div>
  );
}

export default App;
