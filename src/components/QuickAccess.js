import React from 'react';
import './QuickAccess.css';
import { FaUsers, FaCalendarCheck, FaMoneyCheckAlt, FaChartLine } from 'react-icons/fa';
import Employee from '../pages/Employee';
import Attendance from '../pages/Attendance';
import Payroll from '../pages/Payroll';
import Performance from '../pages/Performance';

const QuickAccess = () => {
  const navigate = useNavigate();

  const items = [
    { icon: <FaUsers />, label: 'Employees', path: '/employee' },
    { icon: <FaCalendarCheck />, label: 'Attendance', path:'/attendance' },
    { icon: <FaMoneyCheckAlt />, label: 'Payroll', path: '/payroll' },
    { icon: <FaChartLine />, label: 'Performance', path: '/performance' },
  ];

 return (
    <div className="quick-access">
      {items.map((item, index) => (
        <div
          className="quick-card"
          key={index}
          onClick={() => navigate(item.path)}
          style={{ cursor: 'pointer' }}
        >
          <div className="icon">{item.icon}</div>
          <div className="label">{item.label}</div>
        </div>
      ))}
    </div>
  );
};

export default QuickAccess;
