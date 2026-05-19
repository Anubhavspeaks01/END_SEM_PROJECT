const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Middleware to protect routes.
 * Intercepts the Authorization: Bearer <token> header, verifies the token,
 * and attaches the user payload to the request object.
 */
const protect = async (req, res, next) => {
  let token;

  // Check if header exists and starts with Bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user from DB and attach to req.user (excluding password)
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ success: false, error: 'User not found' });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ success: false, error: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ success: false, error: 'Not authorized, no token' });
  }
};

module.exports = { protect };
