import React, { useState } from "react";
import axios from "axios";

function StudentForm({ onStudentAdded }) {
  const [form, setForm] = useState({ name: "", rollNo: "", course: "", email: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/students", form);
    alert("Student added successfully!");
    setForm({ name: "", rollNo: "", course: "", email: "" });
    onStudentAdded(); // 🔥 refresh the list immediately
  };

  return (
    <section className="form-section">
    <div className="form-container">
      <h2>Add Student</h2>
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
