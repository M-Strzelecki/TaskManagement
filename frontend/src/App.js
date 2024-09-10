import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';
import Profile from './components/Profile';
import WelcomeScreen from './components/WelcomeScreen';
import { AuthContext } from './context/AuthContext';

const App = () => {
  const { user, logout } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Router>
      <div className="container-fluid p-0">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand" to="/">TaskManager</Link>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                {user ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/tasks">Tasks</Link>
                    </li>
                    <li className="nav-item">
                      <button className="btn btn-danger" onClick={logout}>Logout</button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <button className="btn btn-link" onClick={() => setIsLogin(true)}>Login</button>
                    </li>
                    <li className="nav-item">
                      <button className="btn btn-link" onClick={() => setIsLogin(false)}>Register</button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>

        <div className="container mt-5">
          <Routes>
            <Route path="/welcome" element={user ? <WelcomeScreen /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/tasks" element={user ? <TaskList /> : <Navigate to="/login" />} />
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/welcome" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
