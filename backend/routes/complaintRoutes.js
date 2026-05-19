const express = require('express');
const { body } = require('express-validator');
const {
  createComplaint,
  getComplaints,
  updateComplaintStatus,
  searchComplaintsByLocation,
  deleteComplaint
} = require('../controllers/complaintController');
const { protect } = require('../middleware/authMiddleware');
const { validate } = require('../utils/validation');

const router = express.Router();

// Validation Rules for creating a complaint
const complaintValidationRules = [
  body('name', 'Name is required').notEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  body('title', 'Title is required').notEmpty(),
  body('description', 'Description is required').notEmpty(),
  body('category', 'Category is required').notEmpty(),
  body('location', 'Location is required').notEmpty()
];

// Route: GET /api/complaints/search?location=...
// Note: Put specific routes like /search before parameterized routes like /:id
router.get('/search', protect, searchComplaintsByLocation);

// Route: POST /api/complaints
// Accessible publicly (or add `protect` middleware if required)
router.post('/', complaintValidationRules, validate, createComplaint);

// Route: GET /api/complaints
router.get('/', protect, getComplaints);

// Route: PUT /api/complaints/:id
router.put('/:id', protect, updateComplaintStatus);

// Route: DELETE /api/complaints/:id
router.delete('/:id', protect, deleteComplaint);

module.exports = router;
