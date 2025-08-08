import React from 'react';
import './Payroll.css';

const Payroll = () => {
  return (
    <div className="payroll-container">
      <h2>Payroll Management</h2>

      <div className="payroll-form">
        <input type="text" placeholder="Employee Name" />
        <input type="text" placeholder="Role" />
        <input type="number" placeholder="Salary" />
        <select>
          <option value="">Select Month</option>
          <option value="january">January</option>
          <option value="february">February</option>
          <option value="march">March</option>
          {/* Add remaining months */}
        </select>
        <button>Generate Payslip</button>
      </div>

      <table className="payroll-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Salary</th>
            <th>Month</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* Example row */}
          <tr>
            <td>John Doe</td>
            <td>Software Engineer</td>
            <td>$5000</td>
            <td>August</td>
            <td>Paid</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Payroll;
