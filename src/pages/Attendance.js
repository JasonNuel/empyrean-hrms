// src/pages/Attendance.js
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import './Attendance.css';

function Attendance() {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    const { data, error } = await supabase.from('attendance').select('*');
    if (error) {
      console.error('Error fetching attendance:', error.message);
    } else {
      setAttendanceData(data);
    }
  };

  return (
    <div className="attendance-container">
      <h2>Attendance Records</h2>
      <table className="attendance-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee Name</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.length === 0 ? (
            <tr>
              <td colSpan="4">No attendance records found.</td>
            </tr>
          ) : (
            attendanceData.map(record => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.employee_name}</td>
                <td>{record.date}</td>
                <td>{record.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Attendance;
