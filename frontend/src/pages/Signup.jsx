import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/signup', { name, email, password });
      localStorage.setItem('userInfo', JSON.stringify(data.data));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to register');
    }
  };

  return (
    <div className="card auth-card animate-fade">
      <h2 className="card-title">Create Account</h2>
      {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="John Doe"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
            placeholder="Minimum 6 characters"
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem' }}>
          Sign Up
        </button>
      </form>
      <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem' }}>
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Signup;
