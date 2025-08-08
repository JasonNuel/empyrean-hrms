import React from 'react';
import './EmployeeWorkInfo.css';
import { FaUserCheck, FaHome, FaPlaneDeparture, FaClock, FaUserTimes } from 'react-icons/fa';

const workInfoStats = [
  { icon: <FaUserCheck />, label: 'Present Today', count: 42 },
  { icon: <FaHome />, label: 'Working Remotely', count: 8 },
  { icon: <FaPlaneDeparture />, label: 'On Leave', count: 5 },
  { icon: <FaClock />, label: 'Late Check-ins', count: 3 },
  { icon: <FaUserTimes />, label: 'Clocked Out', count: 10 },
];

const EmployeeWorkInfo = () => {
  return (
    <div className="employee-work-info">
      {workInfoStats.map((info, index) => (
        <div className="work-info-card" key={index}>
          <div className="work-info-icon">{info.icon}</div>
          <div className="work-info-label">{info.label}</div>
          <div className="work-info-count">{info.count}</div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeWorkInfo;
