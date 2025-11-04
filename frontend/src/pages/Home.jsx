import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FeatureCard from "../components/FeatureCard.jsx";
import StatsBar from "../components/StatsBar.jsx";
import Footer from "../components/Footer.jsx";
import "../css/Home.css";
import "../css/Footer.css";

const Home = () => {
  const stats = {
    totalReports: "12,847",
    activeAlerts: "23",
    communityMembers: "8,456",
    predictionsMade: "45,231"
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <motion.section 
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-background">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
          
          <div className="hero-content">
            <motion.div
              className="hero-glass-card"
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
            >
              <motion.div
                className="hero-badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
              >
                🛡️ AI-Powered Safety
              </motion.div>
              
              <h1 className="hero-title">
                Next-Gen <span className="text-gradient">Crime Prediction</span>
              </h1>
              
              <p className="hero-subtitle">
                Harness the power of artificial intelligence to predict, prevent, and protect your community from crime
              </p>
              
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">99.2%</span>
                  <span className="stat-label">Accuracy</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Monitoring</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">50K+</span>
                  <span className="stat-label">Users</span>
                </div>
              </div>
              
              <div className="hero-buttons">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/prediction" className="btn btn--hero-primary">
                    🎯 Start Prediction
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        className="stats-section"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="stats-container">
          <motion.div 
            className="stats-header"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="stats-badge">📊 Live Analytics</div>
            <h3>Real-Time Platform Statistics</h3>
            <p><strong>Live data from our crime prediction network across the globe</strong></p>
          </motion.div>
          
          <div className="modern-stats-grid">
            {[
              { label: "Total Reports", value: stats.totalReports, icon: "📋", color: "blue" },
              { label: "Active Alerts", value: stats.activeAlerts, icon: "🚨", color: "red" },
              { label: "Community Members", value: stats.communityMembers, icon: "👥", color: "green" },
              { label: "Predictions Made", value: stats.predictionsMade, icon: "🎯", color: "purple" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className={`modern-stat-card stat-${stat.color}`}
                initial={{ y: 30, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.6, type: "spring" }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-content">
                  <div className="stat-number">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
                <div className="stat-glow"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="features-section"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        <div className="features-container">
          <motion.div 
            className="stats-header"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="stats-badge">⚡ Advanced Technology</div>
            <h3>Powerful Features for Community Safety</h3>
            <p><strong>Comprehensive AI-driven tools designed to keep you and your community informed and protected</strong></p>
          </motion.div>
          
          <div className="features-grid">
            {[
              { icon: "🎯", title: "Crime Prediction", desc: "AI-powered forecasting to predict crime risk by location, time, and type with high accuracy.", path: "/prediction" },
              { icon: "📢", title: "Community Reports", desc: "Report incidents, share safety concerns, and collaborate with neighbors for a safer community.", path: "/community" },
              { icon: "📊", title: "Crime Analytics", desc: "Interactive dashboards and detailed statistics to understand crime trends and patterns.", path: "/community" },
              { icon: "🚨", title: "Safety Alerts", desc: "Real-time notifications and personalized safety recommendations based on your location.", path: "/community" }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="feature-wrapper"
              >
                <Link to={feature.path} className="feature-link">
                  <FeatureCard
                    icon={feature.icon}
                    title={feature.title}
                    desc={feature.desc}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="cta-section"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
      >
        <div className="cta-background">
          <div className="cta-shapes">
            <div className="cta-shape cta-shape-1"></div>
            <div className="cta-shape cta-shape-2"></div>
          </div>
          <motion.div 
            className="cta-content"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <div className="cta-badge">🚀 Join the Future</div>
            <h2>Ready to Make Your Community Safer?</h2>
            <p>Join thousands of users who trust CrimeWatch for their safety needs. Start protecting your community today with AI-powered crime prevention.</p>
            <div className="cta-buttons">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/prediction" className="btn btn--hero-primary">
                  <span className="btn-icon">🎯</span>
                  Get Started Now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Trust Section */}
      <motion.section 
        className="trust-section"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className="trust-content">
          <h3>Trusted by Communities Worldwide</h3>
          <div className="trust-stats">
            <div className="trust-item">
              <span className="trust-number">150+</span>
              <span className="trust-label">Cities Protected</span>
            </div>
            <div className="trust-item">
              <span className="trust-number">2M+</span>
              <span className="trust-label">Predictions Made</span>
            </div>
            <div className="trust-item">
              <span className="trust-number">95%</span>
              <span className="trust-label">Crime Reduction</span>
            </div>
          </div>
        </div>
      </motion.section>
      
      <Footer />
    </div>
  );
};

export default Home;