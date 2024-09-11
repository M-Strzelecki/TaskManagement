import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="container text-center mt-5">
      <h1>Welcome, {user.name}!</h1>
      <p>Select an option below:</p>
      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-primary mx-2" onClick={() => navigate('/tasks')}>
          View Tasks
        </button>
        <button className="btn btn-success mx-2" onClick={() => navigate('/profile')}>
          Manage Profile
        </button>
        <button className="btn btn-danger mx-2" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
