import React from 'react';
import './DashboardCards.css';

const DashboardCards = () => {
  const stats = [
   
    { title: 'Total Employees', value: 58 },
    { title: 'Total Departments', value: 6 },
    { title: 'Employees on Leave', value: 5 },
    { title: 'Resigned this Month', value: 1 },
  ];

  return (
    <div className="dashboard-cards">
      {stats.map((stat, index) => (
        <div className="card" key={index}>
          <h3>{stat.title}</h3>
          <p>{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
