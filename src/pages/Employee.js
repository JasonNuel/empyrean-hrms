import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import './Employees.css';

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    salary: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    salary: ''
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Fetch all employees
  const fetchEmployees = async () => {
    const { data, error } = await supabase
      .from('employees')
      .select('*')
      .order('created_at', { ascending: true });
    if (error) {
      console.error('Error fetching employees:', error);
    } else {
      setEmployees(data);
    }
  };

  // Add new employee
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('employees').insert([formData]);
    if (error) {
      console.error('Error adding employee:', error);
    } else {
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        position: '',
        department: '',
        salary: ''
      });
      fetchEmployees();
    }
  };

  // Delete employee
  const handleDelete = async (id) => {
    const { error } = await supabase.from('employees').delete().eq('id', id);
    if (error) {
      console.error('Error deleting employee:', error);
    } else {
      fetchEmployees();
    }
  };

  // Start editing
  const handleEdit = (emp) => {
    setEditingId(emp.id);
    setEditData({
      first_name: emp.first_name,
      last_name: emp.last_name,
      email: emp.email,
      phone: emp.phone,
      position: emp.position,
      department: emp.department,
      salary: emp.salary
    });
  };

  // Save edited employee
  const handleSave = async (id) => {
    const { error } = await supabase
      .from('employees')
      .update(editData)
      .eq('id', id);
    if (error) {
      console.error('Error updating employee:', error);
    } else {
      setEditingId(null);
      fetchEmployees();
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <div className="employees-container">
      <h2>Employees</h2>

      {/* Add Employee Form */}
      <form className="employee-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={formData.first_name}
          onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <input
          type="text"
          placeholder="Position"
          value={formData.position}
          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Department"
          value={formData.department}
          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Salary"
          value={formData.salary}
          onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
        />
        <button type="submit">Add Employee</button>
      </form>

      {/* Employees Table */}
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Position</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              {editingId === emp.id ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={editData.first_name}
                      onChange={(e) =>
                        setEditData({ ...editData, first_name: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editData.last_name}
                      onChange={(e) =>
                        setEditData({ ...editData, last_name: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) =>
                        setEditData({ ...editData, email: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editData.phone}
                      onChange={(e) =>
                        setEditData({ ...editData, phone: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editData.position}
                      onChange={(e) =>
                        setEditData({ ...editData, position: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editData.department}
                      onChange={(e) =>
                        setEditData({ ...editData, department: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={editData.salary}
                      onChange={(e) =>
                        setEditData({ ...editData, salary: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <button onClick={() => handleSave(emp.id)}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{emp.first_name}</td>
                  <td>{emp.last_name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.position}</td>
                  <td>{emp.department}</td>
                  <td>{emp.salary}</td>
                  <td>
                    <button onClick={() => handleEdit(emp)}>Edit</button>
                    <button onClick={() => handleDelete(emp.id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Employees;
