import React from 'react';
import './UpcomingTasks.css';

const UpcomingTasks = () => {
  const tasks = [
    { title: 'Orientation Session', date: 'Aug 5, 2025', time: '10:00 AM' },
    { title: 'Quarterly Performance Review', date: 'Aug 7, 2025', time: '2:00 PM' },
    { title: 'Team Building Workshop', date: 'Aug 10, 2025', time: '11:00 AM' },
  ];

  return (
    <div className="upcoming-tasks">
      <h3>Upcoming Events</h3>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            <div className="task-title">{task.title}</div>
            <div className="task-date">{task.date} @ {task.time}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingTasks;
