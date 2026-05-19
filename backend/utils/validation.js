const { validationResult } = require('express-validator');

/**
 * Structural validation helper.
 * Ensures no payload missing field errors hit the DB raw.
 * Formats errors neatly into a JSON array.
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.path || err.param]: err.msg }));

  return res.status(400).json({
    success: false,
    errors: extractedErrors,
  });
};

module.exports = { validate };
