import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import UserRegistration from './UserRegistration';
import Login from './Login';
import Dashboard from './Dashboard';

const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Fetch token from local storage or a secure source
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  // Multi-colored gradient background
  const getBackgroundStyle = () => ({
    background: 'linear-gradient(135deg, #86a8e7, #91eae4)',
    backgroundSize: '400% 400%',
    animation: 'gradientAnimation 15s ease infinite',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  });

  return (
    <Router>
      <div style={getBackgroundStyle()} className="flex">
        <div className="w-full">
          <Routes>
            <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Login setToken={setToken} />} />
            <Route path="/register" element={<UserRegistration />} />
            <Route path="/dashboard" element={token ? <Dashboard setToken={setToken} /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
