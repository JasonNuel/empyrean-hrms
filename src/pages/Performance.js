// src/pages/Performance.js
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import './Performance.css';

const Performance = () => {
  const [employees, setEmployees] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    employee_id: '',
    rating: '',
    feedback: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    employee_id: '',
    rating: '',
    feedback: ''
  });

  useEffect(() => {
    fetchEmployees();
    fetchReviews();
  }, []);

  const fetchEmployees = async () => {
    const { data, error } = await supabase.from('employees').select('*');
    if (error) console.error('Error fetching employees:', error);
    else setEmployees(data);
  };

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from('performance')
      .select('*, employees(first_name, last_name)')
      .order('id', { ascending: true });
    if (error) console.error('Error fetching reviews:', error);
    else setReviews(data);
  };

  // Add review
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('performance').insert([formData]);
    if (error) console.error('Error adding review:', error);
    else {
      setFormData({ employee_id: '', rating: '', feedback: '' });
      fetchReviews();
    }
  };

  // Edit review
  const handleEdit = (review) => {
    setEditingId(review.id);
    setEditData({
      employee_id: review.employee_id,
      rating: review.rating,
      feedback: review.feedback
    });
  };

  // Save review
  const handleSave = async (id) => {
    const { error } = await supabase.from('performance').update(editData).eq('id', id);
    if (error) console.error('Error updating review:', error);
    else {
      setEditingId(null);
      fetchReviews();
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from('performance').delete().eq('id', id);
    if (error) console.error('Error deleting review:', error);
    else fetchReviews();
  };

  return (
    <div className="performance-container">
      <h2>Performance Reviews</h2>

      {/* Review Form */}
      <form className="performance-form" onSubmit={handleSubmit}>
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

        <select
          value={formData.rating}
          onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
          required
        >
          <option value="">Rating</option>
          <option value="Excellent">Excellent</option>
          <option value="Good">Good</option>
          <option value="Average">Average</option>
          <option value="Poor">Poor</option>
        </select>

        <input
          type="text"
          placeholder="Feedback"
          value={formData.feedback}
          onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
          required
        />

        <button type="submit">Submit Review</button>
      </form>

      {/* Reviews Table */}
      <table className="performance-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Rating</th>
            <th>Feedback</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.length === 0 ? (
            <tr>
              <td colSpan="4">No reviews found.</td>
            </tr>
          ) : (
            reviews.map(review => (
              <tr key={review.id}>
                {editingId === review.id ? (
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
                      <select
                        value={editData.rating}
                        onChange={(e) => setEditData({ ...editData, rating: e.target.value })}
                      >
                        <option value="Excellent">Excellent</option>
                        <option value="Good">Good</option>
                        <option value="Average">Average</option>
                        <option value="Poor">Poor</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        value={editData.feedback}
                        onChange={(e) => setEditData({ ...editData, feedback: e.target.value })}
                      />
                    </td>
                    <td>
                      <button onClick={() => handleSave(review.id)}>Save</button>
                      <button onClick={handleCancel}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{review.employees?.first_name} {review.employees?.last_name}</td>
                    <td>{review.rating}</td>
                    <td>{review.feedback}</td>
                    <td>
                      <button onClick={() => handleEdit(review)}>Edit</button>
                      <button onClick={() => handleDelete(review.id)}>Delete</button>
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

export default Performance;
