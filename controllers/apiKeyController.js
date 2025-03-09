const AuthService = require('../services/authService');

const generateApiKey = async (req, res) => {
  try {
    const userId = req.userId;
    const apiKey = await AuthService.generateApiKey(userId);
    res.json({ apiKey });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { generateApiKey };