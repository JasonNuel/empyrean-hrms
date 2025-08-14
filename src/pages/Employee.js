// src/pages/Employee.js
import React, { useState, useEffect } from "react";
import supabase from "../supabaseClient";

function Employee() {
  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: "", role: "", email: "" });

  // Fetch employees from Supabase
  useEffect(() => {
    fetchEmployees();
  }, []);

  async function fetchEmployees() {
    const { data, error } = await supabase.from("employees").select("*");
    if (error) console.error("Error fetching employees:", error);
    else setEmployees(data);
  }

  // Handle delete
  async function handleDelete(id) {
    const { error } = await supabase.from("employees").delete().eq("id", id);
    if (error) console.error("Error deleting employee:", error);
    else fetchEmployees();
  }

  // Handle edit click
  function handleEditClick(employee) {
    setEditingId(employee.id);
    setEditData({
      name: employee.name,
      role: employee.role,
      email: employee.email
    });
  }

  // Handle save after editing
  async function handleSave() {
    const { error } = await supabase
      .from("employees")
      .update(editData)
      .eq("id", editingId);

    if (error) console.error("Error updating employee:", error);
    else {
      setEditingId(null);
      fetchEmployees();
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Employee List</h2>
      <table
        border="1"
        cellPadding="10"
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              {editingId === employee.id ? (
                <>
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
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) =>
                        setEditData({ ...editData, email: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{employee.name}</td>
                  <td>{employee.role}</td>
                  <td>{employee.email}</td>
                  <td>
                    <button onClick={() => handleEditClick(employee)}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(employee.id)}>
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

export default Employee;
