import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';
import '../css/Community.css';

export default function Community() {
  const { createReport, getReports, user } = useAuth();
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filterLocation, setFilterLocation] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    crimeType: '',
    description: '',
    severity: 'medium'
  });

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      setLoading(true);
      const data = await getReports();
      setReports(data);
      setFilteredReports(data);
    } catch (err) {
      setError('Failed to load reports');
      console.error('Load reports error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reportData = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        crimeType: formData.crimeType.toLowerCase(),
        severity: formData.severity
      };
      
      const newReport = await createReport(reportData);
      const updatedReports = [newReport, ...reports];
      setReports(updatedReports);
      setFilteredReports(updatedReports);
      setFormData({ title: '', location: '', crimeType: '', description: '', severity: 'medium' });
      setShowForm(false);
      alert('Report submitted successfully!');
    } catch (err) {
      setError('Failed to submit report');
      console.error('Submit report error:', err);
    }
  };

  const handleFilter = (location) => {
    setFilterLocation(location);
    if (location === '') {
      setFilteredReports(reports);
    } else {
      const filtered = reports.filter(report => 
        report.location.toLowerCase().includes(location.toLowerCase())
      );
      setFilteredReports(filtered);
    }
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'green';
      default: return 'blue';
    }
  };

  const crimeTypes = ['theft', 'robbery', 'assault', 'vandalism', 'fraud', 'other'];
  const severityLevels = ['low', 'medium', 'high', 'critical'];

  return (
    <div className="community-page">
      <motion.div 
        className="community-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>📢 Community Crime Reports</h1>
        <p>Share and stay informed about safety incidents in your area</p>
      </motion.div>

      <div className="community-actions">
        <motion.button 
          className="report-btn"
          onClick={() => setShowForm(!showForm)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {showForm ? '❌ Cancel' : '📝 Report Incident'}
        </motion.button>
        
        <div className="filter-section">
          <input
            type="text"
            placeholder="Filter by location (e.g., Delhi, Mumbai)"
            value={filterLocation}
            onChange={(e) => handleFilter(e.target.value)}
            className="filter-input"
          />
        </div>
      </div>

      {showForm && (
        <motion.div 
          className="report-form-container"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4 }}
        >
          <form onSubmit={handleSubmit} className="report-form">
            <h3>📋 Submit Crime Report</h3>
            
            <div className="form-grid">
              <div className="form-group">
                <label>Report Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Brief title for the incident"
                  required
                />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="e.g., Connaught Place, Delhi"
                  required
                />
              </div>

              <div className="form-group">
                <label>Crime Type</label>
                <select
                  value={formData.crimeType}
                  onChange={(e) => setFormData({...formData, crimeType: e.target.value})}
                  required
                >
                  <option value="">Select crime type</option>
                  {crimeTypes.map(type => (
                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Severity</label>
                <select
                  value={formData.severity}
                  onChange={(e) => setFormData({...formData, severity: e.target.value})}
                  required
                >
                  {severityLevels.map(level => (
                    <option key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Describe what happened, when, and any other relevant details..."
                rows="4"
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              🚨 Submit Report
            </button>
          </form>
        </motion.div>
      )}

      <motion.div 
        className="reports-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="reports-header">
          <h2>Recent Reports ({filteredReports.length})</h2>
          {filterLocation && (
            <span className="filter-badge">
              Filtered by: {filterLocation}
            </span>
          )}
        </div>

        {loading ? (
          <div className="loading">Loading reports...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="reports-grid">
            {filteredReports.map((report, index) => (
              <motion.div
                key={report._id}
                className={`report-card severity-${getSeverityColor(report.severity)}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <div className="report-header">
                  <div className="crime-type">
                    <span className="crime-icon">⚠️</span>
                    <h3>{report.title}</h3>
                  </div>
                  <span className={`severity-badge ${getSeverityColor(report.severity)}`}>
                    {report.severity.toUpperCase()}
                  </span>
                </div>

                <div className="report-location">
                  <span className="location-icon">📍</span>
                  {report.location}
                </div>

                <div className="report-description">
                  {report.description}
                </div>

                <div className="report-footer">
                  <span className="reporter">
                    👤 {report.userId?.name || 'Anonymous'}
                  </span>
                  <span className="report-date">
                    🕒 {new Date(report.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {filteredReports.length === 0 && (
          <div className="no-reports">
            <h3>No reports found</h3>
            <p>No crime reports match your current filter. Try a different location or clear the filter.</p>
          </div>
        )}
      </motion.div>

      <motion.div 
        className="safety-tips"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <h3>🛡️ Safety Tips</h3>
        <div className="tips-grid">
          <div className="tip-card">
            <span className="tip-icon">👀</span>
            <p>Stay aware of your surroundings, especially in crowded areas</p>
          </div>
          <div className="tip-card">
            <span className="tip-icon">📱</span>
            <p>Keep emergency contacts readily available on your phone</p>
          </div>
          <div className="tip-card">
            <span className="tip-icon">👥</span>
            <p>Travel in groups when possible, especially at night</p>
          </div>
          <div className="tip-card">
            <span className="tip-icon">💰</span>
            <p>Avoid displaying expensive items or large amounts of cash</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}