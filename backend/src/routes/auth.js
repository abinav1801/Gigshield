const express = require('express');
const router = express.Router();
const { signup, sendOtp, verifyOtp } = require('../controllers/authController');

// POST /api/auth/signup
router.post('/signup', signup);

// POST /api/auth/send-otp  (login - send OTP to existing user)
router.post('/send-otp', sendOtp);

// POST /api/auth/verify-otp
router.post('/verify-otp', verifyOtp);

module.exports = router;
