const Plan = require('../models/Plan');
const User = require('../models/User');

// @desc    Get all active plans
// @route   GET /api/plans
// @access  Public
const getPlans = async (req, res, next) => {
  try {
    const plans = await Plan.find({ isActive: true }).sort({ weeklyPrice: 1 });

    res.json({
      success: true,
      plans,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single plan by ID
// @route   GET /api/plans/:id
// @access  Public
const getPlan = async (req, res, next) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }
    res.json({ success: true, plan });
  } catch (err) {
    next(err);
  }
};

// @desc    Subscribe user to a plan (7 days from now)
// @route   POST /api/plans/subscribe/:planId
// @access  Private
const subscribePlan = async (req, res, next) => {
  try {
    const plan = await Plan.findById(req.params.planId);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    const user = await User.findById(req.user._id);
    user.activePlan = plan._id;
    user.planSubscribedAt = new Date();
    user.planExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    await user.save();

    await user.populate('activePlan');

    res.json({
      success: true,
      message: `Successfully subscribed to ${plan.name}`,
      activePlan: user.activePlan,
      planExpiresAt: user.planExpiresAt,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getPlans, getPlan, subscribePlan };
