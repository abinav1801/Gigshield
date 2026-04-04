const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getMe, updateMe, updateEarnings } = require('../controllers/userController');

// GET /api/users/me
router.get('/me', protect, getMe);

// PUT /api/users/me
router.put('/me', protect, updateMe);

// PUT /api/users/me/earnings
router.put('/me/earnings', protect, updateEarnings);

module.exports = router;
