const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getWeather } = require('../controllers/weatherController');

// GET /api/weather
router.get('/', protect, getWeather);

module.exports = router;
