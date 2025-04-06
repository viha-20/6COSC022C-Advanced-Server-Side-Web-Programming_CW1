const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const countryRoutes = require('./countryRoutes');
const keyRoutes = require('./keyRoutes');

router.use('/auth', authRoutes);
router.use('/countries', countryRoutes);
router.use('/keys', keyRoutes);

module.exports = router;