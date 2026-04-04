const Payout = require('../models/Payout');

// @desc    Get all payouts for logged-in user
// @route   GET /api/payouts
// @access  Private
const getPayouts = async (req, res, next) => {
  try {
    const payouts = await Payout.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .populate({
        path: 'claimId',
        select: 'triggerType reason transactionId hoursLost createdAt',
      });

    const totalPaid = payouts
      .filter((p) => p.status === 'paid')
      .reduce((sum, p) => sum + p.amount, 0);

    res.json({
      success: true,
      payouts,
      totalPaid,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getPayouts };
