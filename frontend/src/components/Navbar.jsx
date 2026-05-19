import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, LogOut, PlusCircle } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="nav-brand">
          <ShieldCheck size={28} />
          <span>SmartComplaint</span>
        </Link>
        <div className="nav-links">
          {userInfo ? (
            <>
              <span className="nav-link">Hi, {userInfo.name}</span>
              <Link to="/new" className="btn btn-primary">
                <PlusCircle size={18} /> New Complaint
              </Link>
              <button onClick={logoutHandler} className="btn btn-secondary">
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
