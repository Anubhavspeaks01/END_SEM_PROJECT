const express = require('express');
const { body } = require('express-validator');
const { signup, login } = require('../controllers/authController');
const { validate } = require('../utils/validation');

const router = express.Router();

// Route: POST /api/auth/signup
router.post(
  '/signup',
  [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  validate,
  signup
);

// Route: POST /api/auth/login
router.post(
  '/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists()
  ],
  validate,
  login
);

module.exports = router;
