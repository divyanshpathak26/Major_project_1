// src/pages/Signup.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';
import '../css/Auth.css';

export default function Signup() {
  const [form, setForm] = useState({ 
    firstName: '', 
    lastName: '', 
    email: '', 
    phone: '', 
    address: '', 
    city: '', 
    state: '', 
    zipCode: '', 
    password: '', 
    confirm: '' 
  });
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'password'];
    const missingFields = requiredFields.filter(field => !form[field]);
    if (missingFields.length > 0) return setErr('Name, email, phone and password are required');
    if (form.password !== form.confirm) return setErr('Passwords do not match');
    if (form.password.length < 6) return setErr('Password must be at least 6 characters');
    
    setLoading(true);
    setErr('');
    
    try {
      const userData = {
        name: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
        password: form.password,
        location: `${form.city}, ${form.state}`.replace(', ,', '').trim() || 'Not specified',
        phone: form.phone
      };
      
      console.log('🚀 Attempting signup with:', userData);
      
      // Test connection first
      console.log('🔍 Testing connection to backend...');
      const testResponse = await fetch('http://localhost:5001/api/test');
      console.log('✅ Connection test successful');
      
      // Direct API call to register
      console.log('📤 Sending registration request...');
      const response = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });
      
      console.log('📡 Response status:', response.status);
      console.log('📡 Response headers:', response.headers);
      
      const data = await response.json();
      console.log('📦 Response data:', data);
      
      if (!response.ok) {
        throw new Error(data.msg || 'Registration failed');
      }
      
      alert('Account created successfully! Please login.');
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('❌ Signup error:', error);
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setErr('Cannot connect to server. Please check if backend is running on port 5001.');
      } else {
        setErr(error.message || 'Failed to create account');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="auth-shapes">
          <div className="auth-shape auth-shape-1"></div>
          <div className="auth-shape auth-shape-2"></div>
          <div className="auth-shape auth-shape-3"></div>
        </div>
      </div>
      
      <motion.div 
        className="auth-container signup-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="auth-card">
          <motion.div 
            className="auth-header"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="auth-title">Create Account</h2>
            <p className="auth-subtitle">Join our community safety network</p>
          </motion.div>

          {err && (
            <motion.div 
              className="auth-error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="error-icon">!</span>
              {err}
            </motion.div>
          )}

          <motion.form 
            className="auth-form landscape-form"
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="form-columns">
              <div className="form-column">
                <h3 className="column-title">Personal Information</h3>
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input 
                    className="form-input"
                    placeholder="First name" 
                    value={form.firstName} 
                    onChange={(e)=>setForm({...form,firstName:e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <input 
                    className="form-input"
                    placeholder="Last name" 
                    value={form.lastName} 
                    onChange={(e)=>setForm({...form,lastName:e.target.value})}
                    required
                  />
                </div>

              </div>

              <div className="form-column">
                <h3 className="column-title">Contact Details</h3>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input 
                    className="form-input"
                    placeholder="your@email.com" 
                    type="email" 
                    value={form.email} 
                    onChange={(e)=>setForm({...form,email:e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input 
                    className="form-input"
                    placeholder="(555) 123-4567" 
                    type="tel" 
                    value={form.phone} 
                    onChange={(e)=>setForm({...form,phone:e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-column">
                <h3 className="column-title">Location</h3>
                <div className="form-group">
                  <label className="form-label">Street Address</label>
                  <input 
                    className="form-input"
                    placeholder="123 Main Street (Optional)" 
                    value={form.address} 
                    onChange={(e)=>setForm({...form,address:e.target.value})}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">City</label>
                    <input 
                      className="form-input"
                      placeholder="City (Optional)" 
                      value={form.city} 
                      onChange={(e)=>setForm({...form,city:e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">State</label>
                    <input 
                      className="form-input"
                      placeholder="State (Optional)" 
                      value={form.state} 
                      onChange={(e)=>setForm({...form,state:e.target.value})}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">ZIP Code</label>
                  <input 
                    className="form-input"
                    placeholder="12345 (Optional)" 
                    value={form.zipCode} 
                    onChange={(e)=>setForm({...form,zipCode:e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="password-section">
              <h3 className="column-title">Security</h3>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <div className="input-wrapper password-wrapper">
                    <input 
                      className="form-input"
                      placeholder="Password (min 6 characters)" 
                      type={showPassword ? 'text' : 'password'} 
                      value={form.password} 
                      onChange={(e)=>setForm({...form,password:e.target.value})}
                      required
                      minLength={6}
                    />
                    <button 
                      type="button" 
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? '👁️' : '👁️🗨️'}
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Confirm Password</label>
                  <div className="input-wrapper password-wrapper">
                    <input 
                      className="form-input"
                      placeholder="Confirm password" 
                      type={showConfirm ? 'text' : 'password'} 
                      value={form.confirm} 
                      onChange={(e)=>setForm({...form,confirm:e.target.value})}
                      required
                    />
                    <button 
                      type="button" 
                      className="password-toggle"
                      onClick={() => setShowConfirm(!showConfirm)}
                    >
                      {showConfirm ? '👁️' : '👁️🗨️'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <motion.button 
              type="submit" 
              className="auth-button"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                </>
              )}
            </motion.button>
          </motion.form>

          <motion.div 
            className="auth-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <p className="auth-link-text">
              Already have an account? 
              <Link to="/login" className="auth-link">Sign in</Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}            
