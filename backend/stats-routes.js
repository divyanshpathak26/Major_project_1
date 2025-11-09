import express from 'express';
import User from './User-model.js';
import Report from './Report-model.js';

const router = express.Router();

// GET /api/stats - Get platform statistics
router.get('/', async (req, res) => {
  try {
    console.log('📊 Fetching platform statistics...');
    
    // Get counts from database
    const totalReports = await Report.countDocuments();
    const activeAlerts = await Report.countDocuments({ status: 'active' });
    const communityMembers = await User.countDocuments();
    
    // For predictions, we'll use a calculated value since we don't have a predictions collection yet
    const predictionsMade = Math.floor(totalReports * 2.5); // Rough estimate
    
    const stats = {
      totalReports: totalReports.toLocaleString(),
      activeAlerts: activeAlerts.toString(),
      communityMembers: communityMembers.toLocaleString(),
      predictionsMade: predictionsMade.toLocaleString()
    };
    
    console.log('✅ Stats fetched:', stats);
    res.json(stats);
  } catch (error) {
    console.error('❌ Error fetching stats:', error);
    res.status(500).json({ 
      msg: 'Server error while fetching statistics',
      error: error.message 
    });
  }
});

export default router;