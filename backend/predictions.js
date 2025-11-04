import express from 'express';
import Prediction from './Prediction.js';
import { authMiddleware } from './middleware.js';

const router = express.Router();

// Create prediction
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { location, timeOfDay, dayOfWeek, crimeType } = req.body;
    
    if (!location || !timeOfDay || !dayOfWeek || !crimeType) {
      return res.status(400).json({ msg: 'All fields are required' });
    }

    // Mock AI prediction logic
    const riskLevel = Math.floor(Math.random() * 100);
    let riskCategory = 'Low';
    if (riskLevel >= 75) riskCategory = 'Critical';
    else if (riskLevel >= 50) riskCategory = 'High';
    else if (riskLevel >= 25) riskCategory = 'Medium';

    const factors = [
      'Historical crime data analysis',
      'Time-based risk patterns',
      'Location demographics',
      'Recent incident reports'
    ];

    const recommendations = [
      'Avoid isolated areas during peak risk hours',
      'Stay in well-lit public spaces',
      'Travel in groups when possible',
      'Keep emergency contacts readily available'
    ];

    const prediction = new Prediction({
      userId: req.user.id,
      location,
      timeOfDay,
      dayOfWeek,
      crimeType,
      riskLevel,
      riskCategory,
      factors,
      recommendations
    });

    await prediction.save();
    res.status(201).json(prediction);
  } catch (error) {
    console.error('Create prediction error:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get user's predictions
router.get('/my-predictions', authMiddleware, async (req, res) => {
  try {
    const predictions = await Prediction.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(10);
    
    res.json(predictions);
  } catch (error) {
    console.error('Get predictions error:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;