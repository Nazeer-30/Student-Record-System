import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = "https://student-record-api-rx8u.onrender.com";
// ---------------------------------------------------

function StudentForm({ onStudentAdded }) {
  const [form, setForm] = useState({ name: "", rollNo: "", course: "", email: "" });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous message
    setMessageType("");

    try {
      // --- CRITICAL CHANGE 2: Use the dynamic API_BASE_URL for POST ---
      await axios.post(`${API_BASE_URL}/api/students`, form);
      // ---------------------------------------------------

      // Success feedback
      setMessage("Student added successfully!");
      setMessageType("success");
      
      setForm({ name: "", rollNo: "", course: "", email: "" });
      onStudentAdded(); // Refresh the list immediately

      // Clear success message after a few seconds
      setTimeout(() => setMessage(""), 3000);

    } catch (err) {
      setMessage("Failed to add student. Check server logs.");
      setMessageType("error");
      console.error("Error adding student:", err);
    }
  };

  return (
    <section className="form-section">
      <div className="form-container">
        <h2>Add Student</h2>

        {/* --- CRITICAL CHANGE 3: Display message instead of alert() --- */}
        {message && (
          <p className={`message mb-4 font-semibold text-center ${messageType === 'success' ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}
        {/* ----------------------------------------------------------- */}

        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <input name="rollNo" placeholder="Roll No" value={form.rollNo} onChange={handleChange} required />
          <input name="course" placeholder="Department" value={form.course} onChange={handleChange} required />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <button type="submit">Add</button>
        </form>
      </div>
    </section>
  );
}

export default StudentForm;


