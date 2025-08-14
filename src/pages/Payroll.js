// src/pages/Payroll.js
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import './Payroll.css';

const Payroll = () => {
  const [employees, setEmployees] = useState([]);
  const [payrolls, setPayrolls] = useState([]);
  const [formData, setFormData] = useState({
    employee_id: '',
    salary: '',
    month: '',
    status: 'Pending'
  });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    employee_id: '',
    salary: '',
    month: '',
    status: ''
  });

  useEffect(() => {
    fetchEmployees();
    fetchPayrolls();
  }, []);

  const fetchEmployees = async () => {
    const { data, error } = await supabase.from('employees').select('*');
    if (error) console.error('Error fetching employees:', error);
    else setEmployees(data);
  };

  const fetchPayrolls = async () => {
    const { data, error } = await supabase
      .from('payroll')
      .select('*, employees(first_name, last_name)')
      .order('month', { ascending: true });
    if (error) console.error('Error fetching payrolls:', error);
    else setPayrolls(data);
  };

  // Add new payroll
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('payroll').insert([formData]);
    if (error) console.error('Error adding payroll:', error);
    else {
      setFormData({ employee_id: '', salary: '', month: '', status: 'Pending' });
      fetchPayrolls();
    }
  };

  // Edit payroll
  const handleEdit = (payroll) => {
    setEditingId(payroll.id);
    setEditData({
      employee_id: payroll.employee_id,
      salary: payroll.salary,
      month: payroll.month,
      status: payroll.status
    });
  };

  // Save edited payroll
  const handleSave = async (id) => {
    const { error } = await supabase.from('payroll').update(editData).eq('id', id);
    if (error) console.error('Error updating payroll:', error);
    else {
      setEditingId(null);
      fetchPayrolls();
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from('payroll').delete().eq('id', id);
    if (error) console.error('Error deleting payroll:', error);
    else fetchPayrolls();
  };

  return (
    <div className="payroll-container">
      <h2>Payroll Management</h2>

      {/* Payroll Form */}
      <form className="payroll-form" onSubmit={handleSubmit}>
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
          type="number"
          placeholder="Salary"
          value={formData.salary}
          onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
          required
        />

        <select
          value={formData.month}
          onChange={(e) => setFormData({ ...formData, month: e.target.value })}
          required
        >
          <option value="">Select Month</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>

        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
        </select>

        <button type="submit">Generate Payslip</button>
      </form>

      {/* Payroll Table */}
      <table className="payroll-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Salary</th>
            <th>Month</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payrolls.length === 0 ? (
            <tr>
              <td colSpan="5">No payroll records found.</td>
            </tr>
          ) : (
            payrolls.map(pay => (
              <tr key={pay.id}>
                {editingId === pay.id ? (
                  <>
                    <td>
                      <select
                        value={editData.employee_id}
                        onChange={(e) => setEditData({ ...editData, employee_id: e.target.value })}
                      >
                        {employees.map(emp => (
                          <option key={emp.id} value={emp.id}>
                            {emp.first_name} {emp.last_name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="number"
                        value={editData.salary}
                        onChange={(e) => setEditData({ ...editData, salary: e.target.value })}
                      />
                    </td>
                    <td>
                      <select
                        value={editData.month}
                        onChange={(e) => setEditData({ ...editData, month: e.target.value })}
                      >
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                      </select>
                    </td>
                    <td>
                      <select
                        value={editData.status}
                        onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                      </select>
                    </td>
                    <td>
                      <button onClick={() => handleSave(pay.id)}>Save</button>
                      <button onClick={handleCancel}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{pay.employees?.first_name} {pay.employees?.last_name}</td>
                    <td>{pay.salary}</td>
                    <td>{pay.month}</td>
                    <td>{pay.status}</td>
                    <td>
                      <button onClick={() => handleEdit(pay)}>Edit</button>
                      <button onClick={() => handleDelete(pay.id)}>Delete</button>
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
};

export default Payroll;
