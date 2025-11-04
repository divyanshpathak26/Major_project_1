import { motion } from 'framer-motion';
import CrimePrediction from '../components/CrimePrediction.jsx';
import CrimeGraphs from '../components/CrimeGraphs';
import '../css/Prediction.css';

export default function Prediction() {
  return (
    <div className="prediction-page">
      <motion.div 
        className="prediction-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="page-title">Crime Prediction & Analytics</h1>
        <p className="page-subtitle">
          AI-powered crime risk assessment and data visualization for Delhi
        </p>
      </motion.div>

      <div className="prediction-content">
        <motion.section 
          className="prediction-section"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <CrimePrediction />
        </motion.section>

        <motion.section 
          className="analytics-section"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <CrimeGraphs />
        </motion.section>
      </div>
    </div>
  );
}