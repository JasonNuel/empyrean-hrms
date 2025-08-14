import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import './Attendance.css';

function Attendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [formData, setFormData] = useState({
    employee_name: '',
    date: '',
    status: 'Present'
  });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    employee_name: '',
    date: '',
    status: ''
  });

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    const { data, error } = await supabase
      .from('attendance')
      .select('*')
      .order('date', { ascending: true });
    if (error) {
      console.error('Error fetching attendance:', error.message);
    } else {
      setAttendanceData(data);
    }
  };

  // Add new attendance
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('attendance').insert([formData]);
    if (error) {
      console.error('Error adding attendance:', error);
    } else {
      setFormData({ employee_name: '', date: '', status: 'Present' });
      fetchAttendance();
    }
  };

  // Start editing
  const handleEdit = (record) => {
    setEditingId(record.id);
    setEditData({
      employee_name: record.employee_name,
      date: record.date,
      status: record.status
    });
  };

  // Save edited record
  const handleSave = async (id) => {
    const { error } = await supabase
      .from('attendance')
      .update(editData)
      .eq('id', id);
    if (error) {
      console.error('Error updating attendance:', error);
    } else {
      setEditingId(null);
      fetchAttendance();
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null);
  };

  // Delete attendance
  const handleDelete = async (id) => {
    const { error } = await supabase.from('attendance').delete().eq('id', id);
    if (error) {
      console.error('Error deleting attendance:', error);
    } else {
      fetchAttendance();
    }
  };

  return (
    <div className="attendance-container">
      <h2>Attendance Records</h2>

      {/* Add Attendance Form */}
      <form className="attendance-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Employee Name"
          value={formData.employee_name}
          onChange={(e) => setFormData({ ...formData, employee_name: e.target.value })}
          required
        />
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
        <button type="submit">Add</button>
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
            attendanceData.map((record) => (
              <tr key={record.id}>
                {editingId === record.id ? (
                  <>
                    <td>{record.id}</td>
                    <td>
                      <input
                        type="text"
                        value={editData.employee_name}
                        onChange={(e) => setEditData({ ...editData, employee_name: e.target.value })}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        value={editData.date}
                        onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                      />
                    </td>
                    <td>
                      <select
                        value={editData.status}
                        onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                      >
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                        <option value="On Leave">On Leave</option>
                      </select>
                    </td>
                    <td>
                      <button onClick={() => handleSave(record.id)}>Save</button>
                      <button onClick={handleCancel}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{record.id}</td>
                    <td>{record.employee_name}</td>
                    <td>{record.date}</td>
                    <td>{record.status}</td>
                    <td>
                      <button onClick={() => handleEdit(record)}>Edit</button>
                      <button onClick={() => handleDelete(record.id)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Attendance;
