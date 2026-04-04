const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getPayouts } = require('../controllers/payoutController');

// GET /api/payouts
router.get('/', protect, getPayouts);

module.exports = router;
