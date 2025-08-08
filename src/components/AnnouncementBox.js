import React from 'react';
import './AnnouncementBox.css';

const AnnouncementBox = () => {
  const announcements = [
    {
      title: 'Monthly Staff Meeting',
      message: 'All staff members are expected to attend the monthly meeting on Friday by 10 AM.',
      date: 'Aug 2, 2025',
    },
    {
      title: 'New Health Policy',
      message: 'A new health insurance policy has been rolled out. Check your mail for details.',
      date: 'Aug 1, 2025',
    },
  ];

  return (
    <div className="announcement-box">
      <h2>Announcements</h2>
      <ul>
        {announcements.map((item, index) => (
          <li key={index}>
            <h4>{item.title}</h4>
            <p>{item.message}</p>
            <span className="announcement-date">{item.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnnouncementBox;
