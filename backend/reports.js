import express from 'express';
import Report from './Report.js';
import { authMiddleware } from './middleware.js';

const router = express.Router();

// Get all reports
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(reports);
  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Create new report
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, location, crimeType, severity, isAnonymous } = req.body;
    
    if (!title || !description || !location || !crimeType || !severity) {
      return res.status(400).json({ msg: 'All fields are required' });
    }

    const report = new Report({
      userId: req.user.id,
      title,
      description,
      location,
      crimeType,
      severity,
      isAnonymous: isAnonymous || false
    });

    await report.save();
    
    const populatedReport = await Report.findById(report._id)
      .populate('userId', 'name email');
    
    res.status(201).json(populatedReport);
  } catch (error) {
    console.error('Create report error:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get user's reports
router.get('/my-reports', authMiddleware, async (req, res) => {
  try {
    const reports = await Report.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    
    res.json(reports);
  } catch (error) {
    console.error('Get user reports error:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;