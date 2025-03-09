const ApiKey = require('../models/ApiKey');

const validateApiKey = async (req, res, next) => {
  const apiKey = req.header('X-API-Key');
  if (!apiKey) {
    console.error('API key required');
    return res.status(401).json({ error: 'API key required.' });
  }

  const keyRecord = await ApiKey.findByKey(apiKey);
  if (!keyRecord) {
    console.error('Invalid API key');
    return res.status(403).json({ error: 'Invalid API key.' });
  }

  req.userId = keyRecord.user_id; // Set userId in the request
  console.log(`API key validated for user with ID: ${req.userId}`);
  next();
};

module.exports = validateApiKey;