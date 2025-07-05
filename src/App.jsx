// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import AttendanceForm from './AttendanceForm';
import AttendanceList from './AttendanceList';
import ProtectedRoute from './ProtectedRoute.jsx';
import Home from './Home'; // Assume you already have Home.js

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        {/* ✅ Protected routes */}
        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <AttendanceForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/records"
          element={
            <ProtectedRoute>
              <AttendanceList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
