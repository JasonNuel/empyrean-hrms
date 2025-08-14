import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import './Onboarding.css';

function Onboarding() {
  const [onboardees, setOnboardees] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    status: 'Pending',
  });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: '', role: '', status: '' });

  useEffect(() => {
    fetchOnboardees();
  }, []);

  // Fetch data from Supabase
  const fetchOnboardees = async () => {
    const { data, error } = await supabase
      .from('onboarding')
      .select('*')
      .order('id', { ascending: true });
    if (error) {
      console.error('Error fetching onboardees:', error);
    } else {
      setOnboardees(data);
    }
  };

  // Add new onboardee
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('onboarding').insert([formData]);
    if (error) {
      console.error('Error adding onboardee:', error);
    } else {
      setFormData({ name: '', role: '', status: 'Pending' });
      fetchOnboardees();
    }
  };

  // Delete onboardee
  const handleDelete = async (id) => {
    const { error } = await supabase.from('onboarding').delete().eq('id', id);
    if (error) {
      console.error('Error deleting onboardee:', error);
    } else {
      fetchOnboardees();
    }
  };

  // Start editing
  const handleEdit = (person) => {
    setEditingId(person.id);
    setEditData({ name: person.name, role: person.role, status: person.status });
  };

  // Save edited data
  const handleSave = async (id) => {
    const { error } = await supabase
      .from('onboarding')
      .update(editData)
      .eq('id', id);
    if (error) {
      console.error('Error updating onboardee:', error);
    } else {
      setEditingId(null);
      fetchOnboardees();
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <div className="onboarding-container">
      <h2>Onboarding List</h2>

      {/* Add Form */}
      <form className="onboarding-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          required
        />
        <select
          name="status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit">Add</button>
      </form>

      {/* Data Table */}
      <table className="onboarding-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {onboardees.map((person) => (
            <tr key={person.id}>
              <td>{person.id}</td>

              {editingId === person.id ? (
                <>
                  {/* Editable fields */}
                  <td>
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editData.role}
                      onChange={(e) =>
                        setEditData({ ...editData, role: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <select
                      value={editData.status}
                      onChange={(e) =>
                        setEditData({ ...editData, status: e.target.value })
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={() => handleSave(person.id)}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  {/* Normal view */}
                  <td>{person.name}</td>
                  <td>{person.role}</td>
                  <td>{person.status}</td>
                  <td>
                    <button onClick={() => handleEdit(person)}>Edit</button>
                    <button onClick={() => handleDelete(person.id)}>
                      Delete
                    </button>
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

export default Onboarding;
