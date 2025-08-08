// src/pages/Performance.js
import React from 'react';
import './Performance.css';

const Performance = () => {
  return (
    <div className="performance-container">
      <h2>Performance Reviews</h2>

      <div className="performance-form">
        <input type="text" placeholder="Employee Name" />
        <input type="text" placeholder="Role" />
        <select>
          <option value="">Rating</option>
          <option value="excellent">Excellent</option>
          <option value="good">Good</option>
          <option value="average">Average</option>
          <option value="poor">Poor</option>
        </select>
        <input type="text" placeholder="Feedback" />
        <button>Submit Review</button>
      </div>

      <table className="performance-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Rating</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {/* Example Row */}
          <tr>
            <td>Jane Doe</td>
            <td>Designer</td>
            <td>Excellent</td>
            <td>Consistently delivers high-quality work.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Performance;
