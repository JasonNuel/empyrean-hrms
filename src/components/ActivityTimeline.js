import React from 'react';
import './ActivityTimeline.css';

const ActivityTimeline = () => {
  const activities = [
    { id: 1, message: 'John Doe was onboarded', time: '2 hours ago' },
    { id: 2, message: 'Jane Smith submitted leave request', time: '5 hours ago' },
    { id: 3, message: 'Payroll processed for July', time: '1 day ago' },
    { id: 4, message: 'New task assigned to HR team', time: '2 days ago' },
  ];

  return (
    <div className="activity-timeline">
      <h3>Recent Activity</h3>
      <ul>
        {activities.map(activity => (
          <li key={activity.id} className="activity-item">
            <div className="activity-message">{activity.message}</div>
            <div className="activity-time">{activity.time}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityTimeline;
