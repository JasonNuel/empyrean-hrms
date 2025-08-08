import React from 'react';
import './QuickAccess.css';
import { FaUsers, FaCalendarCheck, FaMoneyCheckAlt, FaChartLine } from 'react-icons/fa';

const QuickAccess = () => {
  const items = [
    { icon: <FaUsers />, label: 'Employees' },
    { icon: <FaCalendarCheck />, label: 'Attendance' },
    { icon: <FaMoneyCheckAlt />, label: 'Payroll' },
    { icon: <FaChartLine />, label: 'Performance' },
  ];

  return (
    <div className="quick-access">
      {items.map((item, index) => (
        <div className="quick-card" key={index}>
          <div className="icon">{item.icon}</div>
          <div className="label">{item.label}</div>
        </div>
      ))}
    </div>
  );
};

export default QuickAccess;
