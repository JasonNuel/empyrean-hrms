// src/pages/Onboarding.js
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

  useEffect(() => {
    fetchOnboardees();
  }, []);

  const fetchOnboardees = async () => {
    const { data, error } = await supabase.from('onboarding').select('*');
    if (error) console.error('Error fetching onboardees:', error);
    else setOnboardees(data);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from('onboarding').insert([formData]);
    if (error) {
      console.error('Error adding onboardee:', error);
    } else {
      setFormData({ name: '', role: '', status: 'Pending' });
      fetchOnboardees();
    }
  };

  return (
    <div className="onboarding-container">
      <h2>Onboarding List</h2>
      
      <form className="onboarding-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleInputChange}
          required
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit">Add</button>
      </form>

      <table className="onboarding-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {onboardees.map((person) => (
            <tr key={person.id}>
              <td>{person.id}</td>
              <td>{person.name}</td>
              <td>{person.role}</td>
              <td>{person.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Onboarding;
