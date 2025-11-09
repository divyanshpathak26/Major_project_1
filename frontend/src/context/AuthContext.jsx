// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);
const API_URL = 'http://localhost:5001/api';

// Test backend connection
const testConnection = async () => {
  try {
    console.log('🔍 Testing backend connection...');
    const res = await fetch(`${API_URL}/test`);
    const data = await res.json();
    console.log('✅ Backend connection successful:', data);
  } catch (error) {
    console.error('❌ Backend connection failed:', error);
    console.log('💡 Make sure backend is running on port 5001 and CORS is configured for port 5173');
  }
};

// Test on load
testConnection();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      // Decode token to get user info
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ id: payload.id, email: payload.email, role: payload.role });
      } catch (err) {
        localStorage.removeItem('token');
        setToken(null);
      }
    }
  }, [token]);

  const signup = async ({ name, email, password, location, phone }) => {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, location, phone })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg);
      return data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const login = async ({ email, password }) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg);
      
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    // Redirect to login page
    window.location.href = '/login';
  };

  const getUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg);
      return data;
    } catch (error) {
      console.error('Get users error:', error);
      throw error;
    }
  };

  // Reports API
  const createReport = async (reportData) => {
    try {
      const res = await fetch(`${API_URL}/reports`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(reportData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg);
      return data;
    } catch (error) {
      console.error('Create report error:', error);
      throw error;
    }
  };

  const getReports = async () => {
    try {
      const res = await fetch(`${API_URL}/reports`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg);
      return data;
    } catch (error) {
      console.error('Get reports error:', error);
      throw error;
    }
  };

  // Predictions API
  const createPrediction = async (predictionData) => {
    try {
      const res = await fetch(`${API_URL}/predictions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(predictionData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg);
      return data;
    } catch (error) {
      console.error('Create prediction error:', error);
      throw error;
    }
  };

  const getUserPredictions = async () => {
    try {
      const res = await fetch(`${API_URL}/predictions/my-predictions`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg);
      return data;
    } catch (error) {
      console.error('Get predictions error:', error);
      throw error;
    }
  };

  const getStats = async () => {
    try {
      const res = await fetch(`${API_URL}/stats`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg);
      return data;
    } catch (error) {
      console.error('Get stats error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      signup, 
      login, 
      logout, 
      getUsers,
      createReport,
      getReports,
      createPrediction,
      getUserPredictions,
      getStats
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
