const express = require('express');
const { generateApiKey } = require('../controllers/apiKeyController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();
router.post('/generate-key', authenticate, generateApiKey);

module.exports = router;