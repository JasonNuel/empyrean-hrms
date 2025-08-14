// src/pages/Onboarding.js
import React, { useState, useEffect } from 'react';

export default function Onboarding() {
  const [onboardingList, setOnboardingList] = useState([]);

  useEffect(() => {
    fetchOnboardingData();
  }, []);

  const fetchOnboardingData = async () => {
    const { data, error } = await supabase.from('onboarding').select('*');
    if (error) {
      console.error('Error fetching onboarding data:', error);
    } else {
      setOnboardingList(data);
    }
  };

  const handleEdit = (id) => {
    console.log('Edit record with ID:', id);
    // Add your edit logic here
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from('onboarding').delete().eq('id', id);
    if (error) {
      console.error('Error deleting record:', error);
    } else {
      fetchOnboardingData();
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Onboarding List</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#fff' }}>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Position</th>
            <th style={thStyle}>Start Date</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {onboardingList.length > 0 ? (
            onboardingList.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={tdStyle}>{item.name}</td>
                <td style={tdStyle}>{item.position}</td>
                <td style={tdStyle}>{item.start_date}</td>
                <td style={tdStyle}>
                  <button
                    onClick={() => handleEdit(item.id)}
                    style={{
                      marginRight: '8px',
                      backgroundColor: '#3C0E0E',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      color: '#ffffffff',
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    style={{
                      backgroundColor: '#dc3545',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      color: '#fff',
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center', padding: '10px' }}>
                No onboarding records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  padding: '10px',
  textAlign: 'left',
  borderBottom: '2px solid #ccc',
};

const tdStyle = {
  padding: '10px',
  textAlign: 'left',
};
