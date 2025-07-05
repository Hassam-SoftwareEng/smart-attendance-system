import React, { useState } from 'react';
import NavBar from './NavBar';
import './Home.css';

function Home() {
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [activePill, setActivePill] = useState('student');

  return (
    <div>
      <header className="main-header">
        <h1>Smart Attendance Management System</h1>
      </header>

      <NavBar />

      <section className="hero-section">
        <h1>Welcome to the Smart Attendance Management System</h1>
        <p>
          Effortlessly track, manage, and analyze attendance for your organization. 
          Empower your workflow with real-time records, secure cloud storage, and insightful analytics.
        </p>
      </section>

      <section className="grid-section">
        <h2 className="text-center text-success mb-4">Why Choose Our Attendance System?</h2>
        <div className="d-flex justify-content-center flex-wrap">
          <div className="grid-card">
            <h5>Real-Time Attendance</h5>
            <p>Mark and view attendance instantly from any device, anywhere.</p>
          </div>
          <div className="grid-card">
            <h5>Automated Reports</h5>
            <p>Generate daily, weekly, or monthly attendance reports with a single click.</p>
          </div>
          <div className="grid-card">
            <h5>Secure Cloud Storage</h5>
            <p>All attendance data is securely stored and backed up in the cloud.</p>
          </div>
          <div className="grid-card">
            <h5>Role-Based Access</h5>
            <p>Admins, teachers, and students get personalized dashboards and permissions.</p>
          </div>
        </div>
      </section>

      <section className="text-center my-4">
        <button className="btn btn-primary" onClick={() => setMessage('Attendance made simple, secure, and smart!')}>
          Why use Smart Attendance?
        </button>
        <div className="mt-3 text-success fw-bold">{message}</div>
      </section>

      <section className="tab-pill-section container">
        <h4>System Overview</h4>
        <div className="d-flex mb-3">
          <button
            className={`btn me-2 ${activeTab === 'overview' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`btn ${activeTab === 'analytics' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </button>
        </div>
        <div className="border rounded p-3 mb-4">
          {activeTab === 'overview'
            ? (
              <>
                <strong>Attendance Overview:</strong> <br />
                Easily mark, edit, and review attendance. Stay updated with notifications and reminders for absentees.
              </>
            )
            : (
              <>
                <strong>Attendance Analytics:</strong> <br />
                Visualize attendance trends, identify frequent absentees, and export analytics for better decision-making.
              </>
            )
          }
        </div>

        <h4>User Roles</h4>
        <div className="d-flex mb-3">
          <button
            className={`btn me-2 ${activePill === 'student' ? 'btn-success' : 'btn-outline-success'}`}
            onClick={() => setActivePill('student')}
          >
            Student
          </button>
          <button
            className={`btn ${activePill === 'admin' ? 'btn-success' : 'btn-outline-success'}`}
            onClick={() => setActivePill('admin')}
          >
            Admin/Teacher
          </button>
        </div>
        <div className="border rounded p-3">
          {activePill === 'student'
            ? (
              <>
                <strong>For Students:</strong> <br />
                Mark your attendance, view your attendance history, and receive notifications for missed days.
              </>
            )
            : (
              <>
                <strong>For Admins/Teachers:</strong> <br />
                Manage attendance records, generate reports, and monitor overall attendance performance.
              </>
            )
          }
        </div>
      </section>

      <footer className="main-footer">
        <p>&copy; 2025 Smart Attendance Management System | All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default Home;