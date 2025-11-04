// src/pages/Dashboard.jsx
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import '../css/Dashboard.css';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { title: 'Total Reports', value: '1,234', change: '+12%', color: 'blue' },
    { title: 'High Risk Areas', value: '23', change: '-5%', color: 'red' },
    { title: 'Safe Zones', value: '156', change: '+8%', color: 'green' },
    { title: 'Active Alerts', value: '7', change: '+2%', color: 'orange' }
  ];

  const quickActions = [
    { title: 'Crime Prediction', desc: 'Predict crime risk for any area', action: () => { console.log('Navigating to prediction'); navigate('/prediction'); }, icon: '🔮' },
    { title: 'Community Reports', desc: 'View and share safety reports', action: () => { console.log('Navigating to community'); navigate('/community'); }, icon: '👥' },
    { title: 'Safety Analytics', desc: 'View crime trends and statistics', action: () => { console.log('Navigating to safety-analytics'); navigate('/safety-analytics'); }, icon: '📊' },
    { title: 'Emergency Contacts', desc: 'Quick access to emergency services', action: () => { console.log('Navigating to emergency-contacts'); navigate('/emergency-contacts'); }, icon: '🆘' }
  ];



  return (
    <div className="dashboard">
      <motion.div 
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Welcome back, {user?.name || 'User'}!</h1>
        <p>Here's your crime safety overview</p>
      </motion.div>

      <motion.div 
        className="stats-grid"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {stats.map((stat, i) => (
          <div key={i} className={`stat-card ${stat.color}`}>
            <h3>{stat.value}</h3>
            <p>{stat.title}</p>
            <span className={`change ${stat.change.startsWith('+') ? 'positive' : 'negative'}`}>
              {stat.change}
            </span>
          </div>
        ))}
      </motion.div>

      <motion.div 
        className="quick-actions"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          {quickActions.map((action, i) => (
            <motion.div 
              key={i} 
              className="action-card" 
              onClick={action.action}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="action-icon-wrapper">
                <span className="action-icon">{action.icon}</span>
              </div>
              <div className="action-content">
                <h3>{action.title}</h3>
                <p>{action.desc}</p>
              </div>
              <div className="action-arrow">→</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}