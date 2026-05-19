const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name']
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
      ]
    },
    title: {
      type: String,
      required: [true, 'Please add a title']
    },
    description: {
      type: String,
      required: [true, 'Please add a description']
    },
    category: {
      type: String,
      required: [true, 'Please add a category']
    },
    location: {
      type: String,
      required: [true, 'Please add a location'],
      index: true // Enable index for fast geolocation filtering
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Resolved'],
      default: 'Pending'
    },
    aiAnalysis: {
      urgency: {
        type: String,
        enum: ['Low', 'Medium', 'High']
      },
      suggestedDepartment: String,
      summary: String,
      autoResponse: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  // Automatically manage updatedAt timestamp
  { timestamps: true }
);

module.exports = mongoose.model('Complaint', complaintSchema);
