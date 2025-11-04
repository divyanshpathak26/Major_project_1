import { useState } from 'react';
import { motion } from 'framer-motion';
import '../css/CrimePrediction.css';

export default function CrimePrediction() {
  const [formData, setFormData] = useState({
    area: '',
    time: '',
    date: '',
    latitude: '',
    longitude: ''
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API call - replace with actual ML prediction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock prediction based on area and time
      const riskLevel = calculateRisk(formData);
      
      setPrediction({
        riskLevel,
        confidence: Math.random() * 0.3 + 0.7,
        recommendations: getRecommendations(riskLevel),
        crimeTypes: getMostLikelyCrimes(formData.area)
      });
    } catch (error) {
      console.error('Prediction error:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateRisk = (data) => {
    const hour = new Date(`2000-01-01T${data.time}`).getHours();
    const riskAreas = ['Karol Bagh', 'Chandni Chowk', 'Lajpat Nagar'];
    
    let riskScore = 0;
    if (riskAreas.includes(data.area)) riskScore += 2;
    if (hour >= 22 || hour <= 5) riskScore += 2;
    if (new Date(data.date).getDay() >= 5) riskScore += 1;
    
    if (riskScore >= 4) return 'High';
    if (riskScore >= 2) return 'Medium';
    return 'Low';
  };

  const getRecommendations = (riskLevel) => {
    const recommendations = {
      High: ['Avoid traveling alone', 'Stay in well-lit areas', 'Keep emergency contacts ready'],
      Medium: ['Be aware of surroundings', 'Avoid displaying valuables', 'Travel in groups if possible'],
      Low: ['General safety precautions', 'Stay alert', 'Report suspicious activities']
    };
    return recommendations[riskLevel] || recommendations.Low;
  };

  const getMostLikelyCrimes = (area) => {
    const crimesByArea = {
      'Connaught Place': ['Pickpocketing', 'Theft'],
      'Karol Bagh': ['Chain Snatching', 'Robbery'],
      'Chandni Chowk': ['Theft', 'Fraud'],
      'Rohini': ['Burglary', 'Vehicle Theft'],
      'Dwarka': ['Vehicle Theft', 'Burglary']
    };
    return crimesByArea[area] || ['Theft', 'Pickpocketing'];
  };

  const getRiskColor = (level) => {
    switch(level) {
      case 'High': return '#ef4444';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <div className="prediction-container">
      <motion.div 
        className="prediction-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="prediction-title">Crime Risk Prediction</h2>
        <p className="prediction-subtitle">Enter location and time details to get safety insights</p>

        <form onSubmit={handleSubmit} className="prediction-form">
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Area</label>
              <select 
                className="form-select"
                value={formData.area}
                onChange={(e) => setFormData({...formData, area: e.target.value})}
                required
              >
                <option value="">Select Area</option>
                <option value="Connaught Place">Connaught Place</option>
                <option value="Karol Bagh">Karol Bagh</option>
                <option value="Chandni Chowk">Chandni Chowk</option>
                <option value="Rohini">Rohini</option>
                <option value="Dwarka">Dwarka</option>
                <option value="Lajpat Nagar">Lajpat Nagar</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Date</label>
              <input 
                type="date"
                className="form-input"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Time</label>
              <input 
                type="time"
                className="form-input"
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Latitude (Optional)</label>
              <input 
                type="number"
                step="0.000001"
                className="form-input"
                placeholder="28.6139"
                value={formData.latitude}
                onChange={(e) => setFormData({...formData, latitude: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Longitude (Optional)</label>
              <input 
                type="number"
                step="0.000001"
                className="form-input"
                placeholder="77.2090"
                value={formData.longitude}
                onChange={(e) => setFormData({...formData, longitude: e.target.value})}
              />
            </div>
          </div>

          <motion.button 
            type="submit"
            className="predict-button"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Analyzing...
              </>
            ) : (
              'Predict Risk'
            )}
          </motion.button>
        </form>

        {prediction && (
          <motion.div 
            className="prediction-result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="risk-header">
              <div 
                className="risk-indicator"
                style={{ backgroundColor: getRiskColor(prediction.riskLevel) }}
              >
                {prediction.riskLevel} Risk
              </div>
              <div className="confidence-score">
                Confidence: {(prediction.confidence * 100).toFixed(1)}%
              </div>
            </div>

            <div className="prediction-details">
              <div className="detail-section">
                <h4>Most Likely Crime Types</h4>
                <div className="crime-types">
                  {prediction.crimeTypes.map((crime, index) => (
                    <span key={index} className="crime-tag">{crime}</span>
                  ))}
                </div>
              </div>

              <div className="detail-section">
                <h4>Safety Recommendations</h4>
                <ul className="recommendations">
                  {prediction.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}