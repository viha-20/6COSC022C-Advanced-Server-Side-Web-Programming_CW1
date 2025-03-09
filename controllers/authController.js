const AuthService = require('../services/authService');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    await AuthService.register(username, email, password);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(`Error in user registration: ${err.message}`);
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { apiKey } = await AuthService.login(username, password);
    res.json({ apiKey });
  } catch (err) {
    console.error(`Error in user login: ${err.message}`);
    res.status(400).json({ error: err.message });
  }
};

const logout = async (req, res) => {
  try {
    const userId = req.userId; // userId is set by the middleware
    await AuthService.logout(userId);
    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error(`Error in user logout: ${err.message}`);
    res.status(400).json({ error: err.message });
  }
};

module.exports = { register, login, logout };