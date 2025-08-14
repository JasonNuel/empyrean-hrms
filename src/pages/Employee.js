// src/pages/Employee.js
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import './Employees.css';

function Employee() {
  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    salary: 0,
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
    if (error) console.error('Error fetching employees:', error);
    else setEmployees(data);
  };

  // Start editing
  const handleEdit = (employee) => {
    setEditingId(employee.id);
    setEditData({
      first_name: employee.first_name,
      last_name: employee.last_name,
      email: employee.email,
      phone: employee.phone,
      position: employee.position,
      department: employee.department,
      salary: employee.salary,
    });
  };

  // Save edited employee
  const handleSave = async (id) => {
    const { error } = await supabase
      .from('employees')
      .update(editData)
      .eq('id', id);
    if (error) console.error('Error updating employee:', error);
    else {
      setEditingId(null);
      fetchEmployees();
    }
  };

  // Delete employee
  const handleDelete = async (id) => {
    const { error } = await supabase.from('employees').delete().eq('id', id);
    if (error) console.error('Error deleting employee:', error);
    else fetchEmployees();
  };

  // Cancel editing
  const handleCancel = () => setEditingId(null);

  return (
    <div className="employees-container">
      <h2>Employee List</h2>
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
                      value={editData.phone || ''}
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
                        setEditData({ ...editData, salary: parseFloat(e.target.value) })
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

export default Employee;
