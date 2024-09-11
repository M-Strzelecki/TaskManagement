import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';
import Profile from './components/Profile';
import WelcomeScreen from './components/WelcomeScreen';
import { AuthContext } from './context/AuthContext';

const App = () => {
  const { user, logout } = React.useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and register forms

  return (
    <Router>
      <div className="container-fluid p-0">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand" to="/">
              TaskManager
            </Link>
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
                      <a className="nav-link" href="#" onClick={() => setIsLogin(true)}>Login</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#" onClick={() => setIsLogin(false)}>Register</a>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>

        {/* Card for Login or Register */}
        <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
          <div className="card" style={{ width: '400px' }}>
            <div className="card-body">
              {isLogin ? (
                <>
                  <h5 className="card-title text-center">Login</h5>
                  <Login />
                  <div className="text-center mt-3">
                    <p>Don't have an account? <a href="#" onClick={() => setIsLogin(false)}>Register here</a></p>
                  </div>
                </>
              ) : (
                <>
                  <h5 className="card-title text-center">Register</h5>
                  <Register />
                  <div className="text-center mt-3">
                    <p>Already have an account? <a href="#" onClick={() => setIsLogin(true)}>Login here</a></p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="container mt-5">
          <Routes>
            {/* <Route path="/welcome" element={user ? <WelcomeScreen /> : <Navigate to="/login" />} /> */}
            {/* <Route path="/login" element={<Login />} /> */}
            {/* <Route path="/register" element={<Register />} /> */}
            <Route path="/tasks" element={user ? <TaskList /> : <Navigate to="/login" />} />
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
            {/* <Route path="*" element={<Navigate to="/welcome" />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
