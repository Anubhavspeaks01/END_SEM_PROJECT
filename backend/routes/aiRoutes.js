const express = require('express');
const { analyzeComplaint } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @desc    Analyze complaint using AI
 * @route   POST /api/ai/analyze
 * @access  Private
 */
router.post('/analyze', protect, analyzeComplaint);

module.exports = router;
