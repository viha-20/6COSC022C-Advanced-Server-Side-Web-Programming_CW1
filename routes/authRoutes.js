const express = require('express');
const { register, login, logout } = require('../controllers/authController');
const validateApiKey = require('../middleware/apiKeyMiddleware'); // Import middleware

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.post('/logout', validateApiKey, logout); // Add middleware here

module.exports = router;