import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import './NavBar.css';

function NavBar() {
  const [user] = useAuthState(auth);
  const location = useLocation();

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <nav className="main-navbar">
      <div className="container d-flex justify-content-center align-items-center py-2 gap-4">
        <Link
          to="/"
          className={`nav-link${location.pathname === '/' || location.pathname === '/home' ? ' active' : ''}`}
        >
          Home
        </Link>
        <Link
          to="/attendance"
          className={`nav-link${location.pathname === '/attendance' ? ' active' : ''}`}
        >
          Mark Attendance
        </Link>
        <Link
          to="/records"
          className={`nav-link${location.pathname === '/records' ? ' active' : ''}`}
        >
          View Records
        </Link>
        {user && (
          <button onClick={handleLogout} className="btn btn-link text-danger">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default NavBar;