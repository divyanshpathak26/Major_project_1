import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../css/SafetyAnalytics.css';

export default function SafetyAnalytics() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [selectedArea, setSelectedArea] = useState('Delhi');

  // Mock data - replace with API calls
  const mockData = {
    Delhi: {
      riskLevel: 78,
      riskStatus: 'High',
      topCrimes: [
        { type: 'Robbery', percentage: 40 },
        { type: 'Theft', percentage: 30 },
        { type: 'Chain Snatching', percentage: 20 },
        { type: 'Vehicle Theft', percentage: 10 }
      ],
      trendData: [
        { month: 'Jan', crimes: 45 },
        { month: 'Feb', crimes: 52 },
        { month: 'Mar', crimes: 48 },
        { month: 'Apr', crimes: 61 },
        { month: 'May', crimes: 58 },
        { month: 'Jun', crimes: 67 }
      ],
      peakTime: '7-10 PM',
      communityReports: 14,
      timeFrame: 'this week'
    },
    Mumbai: {
      riskLevel: 65,
      riskStatus: 'Medium',
      topCrimes: [
        { type: 'Pickpocketing', percentage: 35 },
        { type: 'Fraud', percentage: 25 },
        { type: 'Theft', percentage: 25 },
        { type: 'Harassment', percentage: 15 }
      ],
      trendData: [
        { month: 'Jan', crimes: 38 },
        { month: 'Feb', crimes: 42 },
        { month: 'Mar', crimes: 39 },
        { month: 'Apr', crimes: 45 },
        { month: 'May', crimes: 41 },
        { month: 'Jun', crimes: 48 }
      ],
      peakTime: '8-11 PM',
      communityReports: 9,
      timeFrame: 'this week'
    }
  };

  useEffect(() => {
    setAnalyticsData(mockData[selectedArea]);
  }, [selectedArea]);

  const getRiskColor = (level) => {
    if (level >= 70) return '#ef4444';
    if (level >= 40) return '#f59e0b';
    return '#10b981';
  };

  const getRiskStatus = (level) => {
    if (level >= 70) return 'High Risk';
    if (level >= 40) return 'Medium Risk';
    return 'Low Risk';
  };

  if (!analyticsData) return <div className="loading">Loading analytics...</div>;

  return (
    <div className="safety-analytics">
      <motion.div 
        className="analytics-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2>📊 Safety Analytics</h2>
        <div className="area-selector">
          <select 
            value={selectedArea} 
            onChange={(e) => setSelectedArea(e.target.value)}
            className="area-select"
          >
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
          </select>
        </div>
      </motion.div>

      <div className="analytics-grid">
        {/* Risk Level Card */}
        <motion.div 
          className="analytics-card risk-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="card-header">
            <span className="card-icon">🔥</span>
            <h3>Current Risk Level</h3>
          </div>
          <div className="risk-display">
            <div 
              className="risk-circle"
              style={{ 
                background: `conic-gradient(${getRiskColor(analyticsData.riskLevel)} ${analyticsData.riskLevel * 3.6}deg, #e5e7eb 0deg)` 
              }}
            >
              <div className="risk-inner">
                <span className="risk-percentage">{analyticsData.riskLevel}%</span>
                <span className="risk-label">{getRiskStatus(analyticsData.riskLevel)}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Top Crime Types */}
        <motion.div 
          className="analytics-card crimes-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="card-header">
            <span className="card-icon">🚔</span>
            <h3>Top Crime Types</h3>
          </div>
          <div className="crimes-list">
            {analyticsData.topCrimes.map((crime, index) => (
              <div key={crime.type} className="crime-item">
                <div className="crime-info">
                  <span className="crime-type">{crime.type}</span>
                  <span className="crime-percentage">{crime.percentage}%</span>
                </div>
                <div className="crime-bar">
                  <div 
                    className="crime-fill"
                    style={{ width: `${crime.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Crime Trend Graph */}
        <motion.div 
          className="analytics-card trend-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="card-header">
            <span className="card-icon">📅</span>
            <h3>Crime Trend (6 Months)</h3>
          </div>
          <div className="trend-chart">
            {analyticsData.trendData.map((data, index) => {
              const maxValue = Math.max(...analyticsData.trendData.map(d => d.crimes));
              const height = (data.crimes / maxValue) * 100;
              
              return (
                <div key={data.month} className="trend-bar">
                  <div 
                    className="trend-fill"
                    style={{ height: `${height}%` }}
                  >
                    <span className="trend-value">{data.crimes}</span>
                  </div>
                  <span className="trend-month">{data.month}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Peak Time & Reports */}
        <motion.div 
          className="analytics-card info-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="info-items">
            <div className="info-item">
              <div className="info-header">
                <span className="card-icon">🕒</span>
                <h3>Peak Crime Time</h3>
              </div>
              <div className="info-value">{analyticsData.peakTime}</div>
            </div>
            
            <div className="info-divider"></div>
            
            <div className="info-item">
              <div className="info-header">
                <span className="card-icon">🧍</span>
                <h3>Community Reports</h3>
              </div>
              <div className="info-value">
                {analyticsData.communityReports} reports
                <span className="info-timeframe">{analyticsData.timeFrame}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="analytics-footer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <p className="data-note">
          📊 Data based on ML predictions and community reports • Last updated: 2 hours ago
        </p>
      </motion.div>
    </div>
  );
}