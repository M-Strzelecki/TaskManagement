import React, { createContext, useState, useEffect } from 'react';

// Create Auth Context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check if the user is logged in when the app loads
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Decode the token and get user info (you can also verify with backend if needed)
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  }, []);

  // Handle login
  const login = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  // Handle logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
