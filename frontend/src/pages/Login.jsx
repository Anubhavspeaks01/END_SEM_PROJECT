import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', { email, password });
      localStorage.setItem('userInfo', JSON.stringify(data.data));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid email or password');
    }
  };

  return (
    <div className="card auth-card animate-fade">
      <h2 className="card-title">Welcome Back</h2>
      {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
      <form onSubmit={submitHandler}>
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
            placeholder="Enter password"
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem' }}>
          Login
        </button>
      </form>
      <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem' }}>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
};

export default Login;
