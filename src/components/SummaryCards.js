// src/components/SummaryCards.js
import React from 'react';
import { FaUsers, FaUserPlus, FaChartLine, FaUserFriends } from 'react-icons/fa';
import './SummaryCards.css'; // We'll create this for styling

const cardData = [
  {
    title: 'New Joinings Today',
    count: 5,
    icon: <FaUserPlus />,
    color: '#FFD700', // Gold
  },
  {
    title: 'New Joinings This Week',
    count: 12,
    icon: <FaChartLine />,
    color: '#FFD700',
  },
  {
    title: 'Total Employees',
    count: 120,
    icon: <FaUsers />,
    color: '#FFD700',
  },
  {
    title: 'Total Strength',
    count: 135,
    icon: <FaUserFriends />,
    color: '#FFD700',
  },
];

const SummaryCards = () => {
  return (
    <div className="summary-cards-container">
      {cardData.map((card, index) => (
        <div className="summary-card" key={index}>
          <div className="icon" style={{ color: card.color }}>
            {card.icon}
          </div>
          <div className="details">
            <p className="count">{card.count}</p>
            <p className="title">{card.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
