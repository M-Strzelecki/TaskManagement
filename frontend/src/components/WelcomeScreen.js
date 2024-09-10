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
    <div>
      <h2>Welcome, {user.name}!</h2>
      <p>Select an option below:</p>
      <button onClick={() => navigate('/tasks')}>Go to Task List</button>
      <button onClick={() => navigate('/profile')}>Manage Profile</button>
      <button onClick={handleLogout}>Logout</button>

      <button className="btn btn-primary">Go to Task List</button> 
      <button className="btn btn-success">Manage Profile</button>
      <button className="btn btn-danger">Logout</button>

    </div>
  );
};

export default WelcomeScreen;
