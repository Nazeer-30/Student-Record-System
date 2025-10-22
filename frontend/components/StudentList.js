import React, { useState } from "react";
import axios from "axios";

function StudentList({ students, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", rollNo: "", course: "", email: "" });

  const deleteStudent = async (id) => {
    await axios.delete(`http://localhost:5000/api/students/${id}`);
    onUpdate();
  };

  const startEdit = (student) => {
    setEditingId(student._id);
    setEditForm(student);
  };

  const saveEdit = async () => {
    await axios.put(`http://localhost:5000/api/students/${editingId}`, editForm);
    setEditingId(null);
    onUpdate();
  };

  return (
    <section className="list-section">
    <div className="list-container">
      <h2>Student List</h2>
      <table border="1" cellPadding="8" style={{ margin: "auto" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll No</th>
            <th>Course/Department</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              {editingId === s._id ? (
                <>
                  <td><input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} /></td>
                  <td><input value={editForm.rollNo} onChange={(e) => setEditForm({ ...editForm, rollNo: e.target.value })} /></td>
                  <td><input value={editForm.course} onChange={(e) => setEditForm({ ...editForm, course: e.target.value })} /></td>
                  <td><input value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} /></td>
                  <td>
                    <button onClick={saveEdit}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{s.name}</td>
                  <td>{s.rollNo}</td>
                  <td>{s.course}</td>
                  <td>{s.email}</td>
                  <td>
                    <button onClick={() => startEdit(s)}>Edit</button>
                    <button onClick={() => deleteStudent(s._id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </section>
  );
}

export default StudentList;
