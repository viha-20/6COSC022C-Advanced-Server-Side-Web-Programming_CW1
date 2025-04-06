const express = require('express');
const router = express.Router();
const countryController = require('../controllers/countryController');
const { apiKeyAuth } = require('../middleware/authMiddleware');

router.get('/', apiKeyAuth, countryController.getAllCountries);
router.get('/:name', apiKeyAuth, countryController.getCountryByName);


module.exports = router;