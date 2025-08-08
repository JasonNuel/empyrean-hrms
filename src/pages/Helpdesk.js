import React from 'react';
import './Helpdesk.css';

const Helpdesk = () => {
  return (
    <div className="helpdesk-container">
      <h2>Helpdesk Support</h2>

      <div className="helpdesk-form">
        <input type="text" placeholder="Your Name" />
        <input type="email" placeholder="Your Email" />
        <select>
          <option value="">Select Category</option>
          <option value="technical">Technical Issue</option>
          <option value="hr">HR Concern</option>
          <option value="other">Other</option>
        </select>
        <textarea placeholder="Describe your issue or question..."></textarea>
        <button>Submit Ticket</button>
      </div>

      <div className="ticket-list">
        <h3>Submitted Tickets</h3>
        <table className="helpdesk-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Category</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
         
            <tr>
              <td>John Doe</td>
              <td>john@example.com</td>
              <td>Technical Issue</td>
              <td>Unable to access dashboard</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Helpdesk;
