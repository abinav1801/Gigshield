const User = require('../models/User');

// @desc    Get current logged-in user profile
// @route   GET /api/users/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    const user = req.user; // attached by auth middleware

    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        phone: user.phone,
        platform: user.platform,
        isVerified: user.isVerified,
        activePlan: user.activePlan,
        planSubscribedAt: user.planSubscribedAt,
        planExpiresAt: user.planExpiresAt,
        currentWeekEarnings: user.currentWeekEarnings,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update user profile (name, platform)
// @route   PUT /api/users/me
// @access  Private
const updateMe = async (req, res, next) => {
  try {
    const { name, platform } = req.body;

    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (platform) user.platform = platform;

    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        _id: user._id,
        name: user.name,
        phone: user.phone,
        platform: user.platform,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update this week's earnings
// @route   PUT /api/users/me/earnings
// @access  Private
const updateEarnings = async (req, res, next) => {
  try {
    const { amount } = req.body;
    const user = await User.findById(req.user._id);
    user.currentWeekEarnings = amount;
    await user.save();

    res.json({ success: true, currentWeekEarnings: user.currentWeekEarnings });
  } catch (err) {
    next(err);
  }
};

module.exports = { getMe, updateMe, updateEarnings };
