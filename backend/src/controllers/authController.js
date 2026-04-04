const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Register new user + send OTP
// @route   POST /api/auth/signup
// @access  Public
const signup = async (req, res, next) => {
  try {
    const { name, phone, platform } = req.body;

    if (!name || !phone || !platform) {
      return res.status(400).json({ message: 'Name, phone, and platform are required' });
    }

    const existingUser = await User.findOne({ phone });
    if (existingUser && existingUser.isVerified) {
      return res.status(400).json({ message: 'Phone number already registered. Please login.' });
    }

    let user = existingUser || new User({ name, phone, platform });
    user.name = name;
    user.platform = platform;

    const otp = user.generateOTP();
    await user.save();

    console.log(`📲 OTP for ${phone}: ${otp}`); // In prod, send via SMS

    res.status(201).json({
      success: true,
      message: `OTP sent to +91${phone}`,
      // In development, return OTP for testing
      ...(process.env.OTP_MODE === 'fixed' && { otp }),
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Send OTP to existing user (Login)
// @route   POST /api/auth/send-otp
// @access  Public
const sendOtp = async (req, res, next) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ message: 'Phone number is required' });
    }

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: 'No account found with this number. Please sign up.' });
    }

    const otp = user.generateOTP();
    await user.save();

    console.log(`📲 OTP for ${phone}: ${otp}`);

    res.json({
      success: true,
      message: `OTP sent to +91${phone}`,
      ...(process.env.OTP_MODE === 'fixed' && { otp }),
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Verify OTP and return JWT token
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOtp = async (req, res, next) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({ message: 'Phone and OTP are required' });
    }

    const user = await User.findOne({ phone }).populate('activePlan');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isValid = user.verifyOTP(otp);
    if (!isValid) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Mark verified and clear OTP
    user.isVerified = true;
    user.clearOTP();
    await user.save();

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        name: user.name,
        phone: user.phone,
        platform: user.platform,
        isVerified: user.isVerified,
        activePlan: user.activePlan,
        planExpiresAt: user.planExpiresAt,
        currentWeekEarnings: user.currentWeekEarnings,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { signup, sendOtp, verifyOtp };
