// src/pages/Attendance.js
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import './Attendance.css';

function Attendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    employee_id: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Present',
  });

  useEffect(() => {
    fetchEmployees();
    fetchAttendance();
  }, []);

  // Fetch employees for dropdown
  const fetchEmployees = async () => {
    const { data, error } = await supabase.from('employees').select('id, first_name, last_name');
    if (error) console.error('Error fetching employees:', error);
    else setEmployees(data);
  };

  // Fetch attendance records
  const fetchAttendance = async () => {
    const { data, error } = await supabase
      .from('attendance')
      .select('id, employee_id, date, status, employees(first_name, last_name)')
      .order('date', { ascending: false });
    if (error) console.error('Error fetching attendance:', error);
    else setAttendanceData(data);
  };

  // Add new attendance record
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!formData.employee_id) return alert('Select an employee');
    const { error } = await supabase.from('attendance').insert([formData]);
    if (error) console.error('Error adding attendance:', error);
    else {
      setFormData({ ...formData, employee_id: '', status: 'Present' });
      fetchAttendance();
    }
  };

  // Delete attendance
  const handleDelete = async (id) => {
    const { error } = await supabase.from('attendance').delete().eq('id', id);
    if (error) console.error('Error deleting attendance:', error);
    else fetchAttendance();
  };

  return (
    <div className="attendance-container">
      <h2>Attendance Records</h2>

      {/* Add Attendance Form */}
      <form className="attendance-form" onSubmit={handleAdd}>
        <select
          value={formData.employee_id}
          onChange={(e) => setFormData({ ...formData, employee_id: e.target.value })}
          required
        >
          <option value="">Select Employee</option>
          {employees.map(emp => (
            <option key={emp.id} value={emp.id}>
              {emp.first_name} {emp.last_name}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="On Leave">On Leave</option>
        </select>
        <button type="submit">Add Attendance</button>
      </form>

      {/* Attendance Table */}
      <table className="attendance-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee Name</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.length === 0 ? (
            <tr>
              <td colSpan="5">No attendance records found.</td>
            </tr>
          ) : (
            attendanceData.map(record => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.employees?.first_name} {record.employees?.last_name}</td>
                <td>{record.date}</td>
                <td>{record.status}</td>
                <td>
                  <button onClick={() => handleDelete(record.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Attendance;
