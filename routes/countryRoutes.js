const express = require('express');
const { getCountryData, getCountryByName } = require('../controllers/countryController');
const validateApiKey = require('../middleware/apiKeyMiddleware');

const router = express.Router();
router.get('/countries', validateApiKey, getCountryData);
router.get('/countries/:name', validateApiKey, getCountryByName);

module.exports = router;