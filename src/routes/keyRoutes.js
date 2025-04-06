const express = require('express');
const router = express.Router();
const keyController = require('../controllers/keyController');
const { protect } = require('../middleware/authMiddleware');

router.post('/generate', protect, keyController.generateNewApiKey);
router.get('/info', protect, keyController.getApiKeyInfo);

module.exports = router;