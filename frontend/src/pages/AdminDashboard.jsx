import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';
import '../css/AdminDashboard.css';

export default function AdminDashboard() {
  const { getUsers, user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== 'admin') {
    return (
      <div className="admin-dashboard">
        <div className="access-denied">
          <h2>🚫 Access Denied</h2>
          <p>Admin access required</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <motion.div 
        className="admin-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>👨‍💼 Admin Dashboard</h1>
        <p>Manage users and monitor system activity</p>
      </motion.div>

      <motion.div 
        className="admin-stats"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="stat-card">
          <h3>{users.length}</h3>
          <p>Total Users</p>
        </div>
        <div className="stat-card">
          <h3>{users.filter(u => u.role === 'admin').length}</h3>
          <p>Admins</p>
        </div>
        <div className="stat-card">
          <h3>{users.filter(u => u.role === 'user').length}</h3>
          <p>Regular Users</p>
        </div>
      </motion.div>

      <motion.div 
        className="users-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div className="section-header">
          <h2>👥 User Management</h2>
          <button onClick={loadUsers} className="refresh-btn">🔄 Refresh</button>
        </div>

        {loading ? (
          <div className="loading">Loading users...</div>
        ) : error ? (
          <div className="error">Error: {error}</div>
        ) : (
          <div className="users-table">
            <div className="table-header">
              <span>Name</span>
              <span>Email</span>
              <span>Role</span>
              <span>Location</span>
              <span>Joined</span>
            </div>
            {users.map((userData, i) => (
              <motion.div 
                key={userData._id} 
                className="table-row"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <span className="user-name">{userData.name}</span>
                <span className="user-email">{userData.email}</span>
                <span className={`user-role ${userData.role}`}>{userData.role}</span>
                <span className="user-location">{userData.location || 'Not specified'}</span>
                <span className="user-date">{new Date(userData.createdAt).toLocaleDateString()}</span>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}