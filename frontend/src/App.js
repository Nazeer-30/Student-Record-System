import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import axios from "axios";
import "./App.css";

// Define the API base URL using an environment variable.
// If REACT_APP_API_URL is not set (i.e., running locally), it defaults to http://localhost:5000.
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    // 2. Use the environment variable to construct the full API URL.
    const res = await axios.get(`${API_BASE_URL}/api/students`);
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
