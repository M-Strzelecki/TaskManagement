import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';
import Profile from './components/Profile';
import WelcomeScreen from './components/WelcomeScreen'; // Import the WelcomeScreen
import { AuthContext } from './context/AuthContext';

const App = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <Router>
      <div>
        <nav>
          {user ? (
            <div>
              <span>Welcome, {user.name}</span>
              <a href="/welcome">Dashboard</a> {/* Link to WelcomeScreen */}
              <button onClick={logout}>Logout</button>
            </div>
          ) : (
            <div>
              <a href="/login">Login</a> | <a href="/register">Register</a>
            </div>
          )}
        </nav>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/welcome" element={user ? <WelcomeScreen /> : <Navigate to="/welcome" />} />
          <Route path="/tasks" element={user ? <TaskList /> : <Navigate to="/login" />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/welcome" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
