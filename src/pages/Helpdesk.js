// src/pages/Helpdesk.js
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import './Helpdesk.css';

const Helpdesk = () => {
  const [tickets, setTickets] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    message: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    name: '',
    email: '',
    category: '',
    message: ''
  });

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    const { data, error } = await supabase.from('helpdesk').select('*').order('created_at', { ascending: false });
    if (error) console.error('Error fetching tickets:', error);
    else setTickets(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('helpdesk').insert([formData]);
    if (error) console.error('Error submitting ticket:', error);
    else {
      setFormData({ name: '', email: '', category: '', message: '' });
      fetchTickets();
    }
  };

  const handleEdit = (ticket) => {
    setEditingId(ticket.id);
    setEditData({ ...ticket });
  };

  const handleSave = async (id) => {
    const { error } = await supabase.from('helpdesk').update(editData).eq('id', id);
    if (error) console.error('Error updating ticket:', error);
    else {
      setEditingId(null);
      fetchTickets();
    }
  };

  const handleCancel = () => setEditingId(null);

  const handleDelete = async (id) => {
    const { error } = await supabase.from('helpdesk').delete().eq('id', id);
    if (error) console.error('Error deleting ticket:', error);
    else fetchTickets();
  };

  return (
    <div className="helpdesk-container">
      <h2>Helpdesk Support</h2>

      {/* Ticket Form */}
      <form className="helpdesk-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <select
          value={formData.category}
          onChange={e => setFormData({ ...formData, category: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          <option value="Technical Issue">Technical Issue</option>
          <option value="HR Concern">HR Concern</option>
          <option value="Other">Other</option>
        </select>
        <textarea
          placeholder="Describe your issue or question..."
          value={formData.message}
          onChange={e => setFormData({ ...formData, message: e.target.value })}
          required
        ></textarea>
        <button type="submit">Submit Ticket</button>
      </form>

      {/* Tickets Table */}
      <div className="ticket-list">
        <h3>Submitted Tickets</h3>
        <table className="helpdesk-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Category</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length === 0 ? (
              <tr>
                <td colSpan="5">No tickets found.</td>
              </tr>
            ) : (
              tickets.map(ticket => (
                <tr key={ticket.id}>
                  {editingId === ticket.id ? (
                    <>
                      <td><input type="text" value={editData.name} onChange={e => setEditData({ ...editData, name: e.target.value })} /></td>
                      <td><input type="email" value={editData.email} onChange={e => setEditData({ ...editData, email: e.target.value })} /></td>
                      <td>
                        <select value={editData.category} onChange={e => setEditData({ ...editData, category: e.target.value })}>
                          <option value="Technical Issue">Technical Issue</option>
                          <option value="HR Concern">HR Concern</option>
                          <option value="Other">Other</option>
                        </select>
                      </td>
                      <td><input type="text" value={editData.message} onChange={e => setEditData({ ...editData, message: e.target.value })} /></td>
                      <td>
                        <button onClick={() => handleSave(ticket.id)}>Save</button>
                        <button onClick={handleCancel}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{ticket.name}</td>
                      <td>{ticket.email}</td>
                      <td>{ticket.category}</td>
                      <td>{ticket.message}</td>
                      <td>
                        <button onClick={() => handleEdit(ticket)}>Edit</button>
                        <button onClick={() => handleDelete(ticket.id)}>Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Helpdesk;
