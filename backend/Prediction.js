import mongoose from 'mongoose';

const predictionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  timeOfDay: {
    type: String,
    required: true
  },
  dayOfWeek: {
    type: String,
    required: true
  },
  crimeType: {
    type: String,
    required: true
  },
  riskLevel: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  riskCategory: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    required: true
  },
  factors: [{
    type: String
  }],
  recommendations: [{
    type: String
  }]
}, {
  timestamps: true
});

export default mongoose.model('Prediction', predictionSchema);