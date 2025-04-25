import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";


const App = () => {
  const [students, setStudents] = useState([]);


  // Fetch students on page load
  useEffect(() => {
    fetchStudents();
  }, []);


  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:3000/api/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };


  // Add student and update list
  const addStudent = async (name, course) => {
    try {
      await axios.post("http://127.0.0.1:3000/api/students", { name, course });
      fetchStudents(); // Refresh student list immediately
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };


 
  return (
    <div
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center', // Added to ensure children are centered within the div
      color: 'white',
    }}
  >
    <h1>Student Recording System</h1>
    <StudentForm addStudent={addStudent} />
    <StudentList students={students} />
  </div>
  );
};

export default App;