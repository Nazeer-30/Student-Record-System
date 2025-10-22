import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import axios from "axios";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:5000/api/students");
    setStudents(res.data);
  };

  useEffect(() => {
    if (isLoggedIn) fetchStudents();
  }, [isLoggedIn]);

  return (
    <div className="App">
    <div className="App-content">
      {!isLoggedIn ? (
      <Login onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <>
          <h1 className="apph1">🎓 Student Record System</h1>
          <StudentForm onStudentAdded={fetchStudents} />
          <StudentList students={students} onUpdate={fetchStudents} />
        </>
      )}
    </div>
  </div>

  );
}

export default App;
