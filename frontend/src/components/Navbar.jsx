// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { motion } from "framer-motion";
import "../css/Nav.css"

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <motion.nav 
      className="modern-navbar"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="navbar-container">
        {/* Brand Logo */}
        <motion.div
          className="brand-logo"
          onClick={() => navigate("/home")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="brand-icon">🛡️</span>
          <span className="brand-text">CrimeWatch</span>
        </motion.div>



        {/* User Actions */}
        <div className="nav-actions">
          <Link to="/" className="btn btn--home">
            Home
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" className="btn btn--home">
                Dashboard
              </Link>
              <button className="btn btn--home btn--logout" onClick={() => {
                logout();
                navigate('/login');
              }}>
                Logout
              </button>
            </>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn--nav-secondary">
                Login
              </Link>
              <Link to="/signup" className="btn btn--nav-primary">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
