import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore";
import './AttendanceForm.css';
import NavBar from "./NavBar";
import { Link } from "react-router-dom";

function AttendanceForm() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Present");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentMsg, setStudentMsg] = useState("");
  const [students, setStudents] = useState([]);

  // Fetch students for dropdown
  useEffect(() => {
    const fetchStudents = async () => {
      const snapshot = await getDocs(collection(db, "students"));
      setStudents(snapshot.docs.map(doc => doc.data().name));
    };
    fetchStudents();
  }, [studentMsg]); // refetch when a student is added

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim() === "") {
      setMessage("❌ Name is required.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await addDoc(collection(db, "attendance"), {
        name: name.trim(),
        status,
        timestamp: serverTimestamp(),
      });

      setName("");
      setStatus("Present");
      setMessage("✅ Attendance submitted successfully!");
    } catch (error) {
      console.error("❌ Error adding attendance:", error.message);
      setMessage("❌ Failed to submit attendance. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Feature: Add student for future use
  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (studentName.trim() === "") {
      setStudentMsg("❌ Student name is required.");
      return;
    }
    setStudentMsg("");
    try {
      await addDoc(collection(db, "students"), {
        name: studentName.trim(),
        createdAt: serverTimestamp(),
      });
      setStudentName("");
      setStudentMsg("✅ Student added for future use!");
    } catch (error) {
      setStudentMsg("❌ Failed to add student.");
    }
  };

  // Handle dropdown selection
  const handleStudentSelect = (e) => {
    setName(e.target.value);
  };

  return (
    <div>
      <NavBar />
      <div className="attendance-container">
        <div className="attendance-card">
          <h2 className="text-center mb-3">Mark Your Attendance</h2>

          {message && <div className="message-box">{message}</div>}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter your name"
              className="attendance-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ marginBottom: 8 }}
            />

            <div style={{ marginBottom: 12 }}>
              <select
                className="attendance-select"
                value={name}
                onChange={handleStudentSelect}
              >
                <option value="">-- Select from added students --</option>
                {students.map((student, idx) => (
                  <option key={idx} value={student}>
                    {student}
                  </option>
                ))}
              </select>
            </div>

            <select
              className="attendance-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>

            <button type="submit" className="attendance-btn" disabled={loading}>
              {loading ? "Submitting..." : "Submit Attendance"}
            </button>
          </form>

          <div className="text-center mt-3">
            <span>Want to see all attendance records? </span>
            <Link to="/records" className="text-primary" style={{ textDecoration: 'underline' }}>
              View Attendance List
            </Link>
          </div>

          <hr className="my-4" />

          <h4 className="text-center mb-2">Add Student (for future use)</h4>
          <form onSubmit={handleAddStudent}>
            <input
              type="text"
              placeholder="Enter student name"
              className="attendance-input"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
            <button type="submit" className="attendance-btn" style={{ marginTop: 8 }}>
              Add Student
            </button>
          </form>
          {studentMsg && <div className="message-box mt-2">{studentMsg}</div>}
        </div>
      </div>
    </div>
  );
}

export default AttendanceForm;