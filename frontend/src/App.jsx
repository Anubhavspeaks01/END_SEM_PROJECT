import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import NewComplaint from './pages/NewComplaint';
import Navbar from './components/Navbar';
import './styles/global.css';

const PrivateRoute = ({ children }) => {
  const userInfo = localStorage.getItem('userInfo');
  return userInfo ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route 
              path="/" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/new" 
              element={
                <PrivateRoute>
                  <NewComplaint />
                </PrivateRoute>
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
