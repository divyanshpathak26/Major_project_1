import { motion } from 'framer-motion';
import SafetyAnalyticsComponent from '../components/SafetyAnalytics.jsx';
import '../css/SafetyAnalyticsPage.css';

export default function SafetyAnalyticsPage() {
  console.log('SafetyAnalytics page loaded');
  return (
    <div className="safety-analytics-page">
      <motion.div 
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>📊 Safety Analytics Dashboard</h1>
        <p>Real-time crime insights powered by AI predictions and community data</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <SafetyAnalyticsComponent />
      </motion.div>

      <motion.div 
        className="insights-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <h2>🧠 Key Insights</h2>
        <div className="insights-grid">
          <div className="insight-card">
            <div className="insight-icon">⚠️</div>
            <h3>High Risk Areas</h3>
            <p>Crime rates are 23% higher in commercial districts during evening hours. Increased police patrolling recommended.</p>
          </div>
          
          <div className="insight-card">
            <div className="insight-icon">📈</div>
            <h3>Rising Trend</h3>
            <p>Vehicle theft incidents have increased by 15% this month. Community awareness campaigns are being initiated.</p>
          </div>
          
          <div className="insight-card">
            <div className="insight-icon">🛡️</div>
            <h3>Safety Improvement</h3>
            <p>Areas with active community reporting show 30% faster police response times and better crime prevention.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}