import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../css/CrimeGraphs.css';

export default function CrimeGraphs() {
  const [activeTab, setActiveTab] = useState('trends');
  const [crimeData, setCrimeData] = useState(null);

  useEffect(() => {
    // Simulate loading crime data
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCrimeData(generateMockData());
    };
    loadData();
  }, []);

  const generateMockData = () => {
    const areas = ['Connaught Place', 'Karol Bagh', 'Rohini', 'Dwarka', 'Chandni Chowk'];
    const crimeTypes = ['Theft', 'Robbery', 'Burglary', 'Vehicle Theft', 'Chain Snatching'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return {
      trends: months.map(month => ({
        month,
        crimes: Math.floor(Math.random() * 100) + 50
      })),
      areas: areas.map(area => ({
        area,
        crimes: Math.floor(Math.random() * 200) + 100,
        riskLevel: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)]
      })),
      types: crimeTypes.map(type => ({
        type,
        count: Math.floor(Math.random() * 150) + 50,
        percentage: Math.floor(Math.random() * 30) + 10
      })),
      hourly: Array.from({length: 24}, (_, i) => ({
        hour: i,
        crimes: Math.floor(Math.random() * 20) + 5
      }))
    };
  };

  const renderBarChart = (data, xKey, yKey, title) => {
    if (!data) return <div className="loading">Loading...</div>;
    
    const maxValue = Math.max(...data.map(item => item[yKey]));
    
    return (
      <div className="chart-container">
        <h3 className="chart-title">{title}</h3>
        <div className="bar-chart">
          {data.map((item, index) => (
            <motion.div 
              key={index}
              className="bar-item"
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div 
                className="bar"
                style={{ 
                  height: `${(item[yKey] / maxValue) * 200}px`,
                  backgroundColor: getBarColor(item, index)
                }}
              >
                <span className="bar-value">{item[yKey]}</span>
              </div>
              <span className="bar-label">{item[xKey]}</span>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const renderPieChart = (data) => {
    if (!data) return <div className="loading">Loading...</div>;
    
    const total = data.reduce((sum, item) => sum + item.count, 0);
    let currentAngle = 0;
    
    return (
      <div className="chart-container">
        <h3 className="chart-title">Crime Types Distribution</h3>
        <div className="pie-chart-container">
          <svg className="pie-chart" viewBox="0 0 200 200">
            {data.map((item, index) => {
              const percentage = (item.count / total) * 100;
              const angle = (percentage / 100) * 360;
              const startAngle = currentAngle;
              const endAngle = currentAngle + angle;
              
              const x1 = 100 + 80 * Math.cos((startAngle - 90) * Math.PI / 180);
              const y1 = 100 + 80 * Math.sin((startAngle - 90) * Math.PI / 180);
              const x2 = 100 + 80 * Math.cos((endAngle - 90) * Math.PI / 180);
              const y2 = 100 + 80 * Math.sin((endAngle - 90) * Math.PI / 180);
              
              const largeArcFlag = angle > 180 ? 1 : 0;
              const pathData = `M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
              
              currentAngle += angle;
              
              return (
                <motion.path
                  key={index}
                  d={pathData}
                  fill={getPieColor(index)}
                  stroke="white"
                  strokeWidth="2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                />
              );
            })}
          </svg>
          <div className="pie-legend">
            {data.map((item, index) => (
              <div key={index} className="legend-item">
                <div 
                  className="legend-color"
                  style={{ backgroundColor: getPieColor(index) }}
                ></div>
                <span>{item.type}: {item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const getBarColor = (item, index) => {
    if (item.riskLevel) {
      switch(item.riskLevel) {
        case 'High': return '#ef4444';
        case 'Medium': return '#f59e0b';
        case 'Low': return '#10b981';
        default: return '#6b7280';
      }
    }
    const colors = ['#00d4aa', '#01a3a4', '#0891b2', '#0e7490', '#155e75'];
    return colors[index % colors.length];
  };

  const getPieColor = (index) => {
    const colors = ['#00d4aa', '#01a3a4', '#0891b2', '#0e7490', '#155e75'];
    return colors[index % colors.length];
  };

  const tabs = [
    { id: 'trends', label: 'Monthly Trends', icon: '📈' },
    { id: 'areas', label: 'Area Analysis', icon: '🗺️' },
    { id: 'types', label: 'Crime Types', icon: '📊' },
    { id: 'hourly', label: 'Hourly Pattern', icon: '🕐' }
  ];

  return (
    <div className="graphs-container">
      <motion.div 
        className="graphs-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="graphs-header">
          <h2 className="graphs-title">Crime Analytics Dashboard</h2>
          <p className="graphs-subtitle">Visual insights into crime patterns and trends</p>
        </div>

        <div className="tabs-container">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="tab-content">
          {activeTab === 'trends' && renderBarChart(crimeData?.trends, 'month', 'crimes', 'Monthly Crime Trends')}
          {activeTab === 'areas' && renderBarChart(crimeData?.areas, 'area', 'crimes', 'Crime by Area')}
          {activeTab === 'types' && renderPieChart(crimeData?.types)}
          {activeTab === 'hourly' && renderBarChart(crimeData?.hourly, 'hour', 'crimes', 'Hourly Crime Pattern')}
        </div>

        {crimeData && (
          <motion.div 
            className="stats-summary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="stat-item">
              <span className="stat-number">
                {crimeData.trends.reduce((sum, item) => sum + item.crimes, 0)}
              </span>
              <span className="stat-label">Total Crimes</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {crimeData.areas.filter(area => area.riskLevel === 'High').length}
              </span>
              <span className="stat-label">High Risk Areas</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {Math.max(...crimeData.hourly.map(h => h.crimes))}
              </span>
              <span className="stat-label">Peak Hour Crimes</span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}