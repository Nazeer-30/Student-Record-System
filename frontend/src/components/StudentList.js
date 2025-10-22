import React, { useState } from "react";
import axios from "axios";

// --- CRITICAL CHANGE 1: Define the API base URL ---
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
// ---------------------------------------------------

function StudentList({ students, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", rollNo: "", course: "", email: "" });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const deleteStudent = async (id) => {
    setMessage("");
    setMessageType("");
    try {
      // --- CRITICAL CHANGE 2: Use the dynamic API_BASE_URL for DELETE ---
      await axios.delete(`${API_BASE_URL}/api/students/${id}`);
      // ------------------------------------------------------------------
      onUpdate();
      setMessage("Student deleted successfully!");
      setMessageType("success");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Failed to delete student. Check server status.");
      setMessageType("error");
      console.error("Delete Error:", error);
    }
  };

  const startEdit = (student) => {
    setMessage("");
    setEditingId(student._id);
    setEditForm(student);
  };

  const saveEdit = async () => {
    setMessage("");
    setMessageType("");
    try {
      // --- CRITICAL CHANGE 3: Use the dynamic API_BASE_URL for PUT ---
      await axios.put(`${API_BASE_URL}/api/students/${editingId}`, editForm);
      // --------------------------------------------------------------
      setEditingId(null);
      onUpdate();
      setMessage("Student updated successfully!");
      setMessageType("success");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Failed to save updates. Check server status.");
      setMessageType("error");
      console.error("Update Error:", error);
    }
  };

  return (
    <section className="list-section">
      <div className="list-container">
        <h2>Student List</h2>

        {/* Display message (Update/Delete feedback) */}
        {message && (
          <p className={`message mb-4 font-semibold text-center ${messageType === 'success' ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}

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
        {students.length === 0 && (
          <p className="text-center py-4">No students added yet.</p>
        )}
      </div>
    </section>
  );
}

export default StudentList;
