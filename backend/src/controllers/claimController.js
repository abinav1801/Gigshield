const Claim = require('../models/Claim');
const Payout = require('../models/Payout');
const User = require('../models/User');
const Plan = require('../models/Plan');

const TRIGGER_LABELS = {
  rain: 'Heavy Rain',
  heat: 'Extreme Heat',
  aqi: 'Air Pollution',
  cyclone: 'Cyclone Alert',
};

// @desc    Get all claims for logged-in user
// @route   GET /api/claims
// @access  Private
const getClaims = async (req, res, next) => {
  try {
    const claims = await Claim.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .populate('planId', 'name');

    res.json({ success: true, claims });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single claim details
// @route   GET /api/claims/:id
// @access  Private
const getClaim = async (req, res, next) => {
  try {
    const claim = await Claim.findOne({
      _id: req.params.id,
      userId: req.user._id,
    }).populate('planId', 'name');

    if (!claim) {
      return res.status(404).json({ message: 'Claim not found' });
    }

    res.json({ success: true, claim });
  } catch (err) {
    next(err);
  }
};

// @desc    Trigger a new claim (weather-based)
// @route   POST /api/claims/trigger
// @access  Private
const triggerClaim = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('activePlan');

    if (!user.activePlan) {
      return res.status(400).json({ message: 'No active plan. Please subscribe to a plan first.' });
    }

    const { triggerType, triggerValue, hoursLost, zone } = req.body;

    if (!triggerType || !triggerValue || !hoursLost) {
      return res.status(400).json({ message: 'triggerType, triggerValue, and hoursLost are required' });
    }

    const plan = user.activePlan;
    const amountClaimed = Math.round(hoursLost * plan.coveragePerHour);

    const label = TRIGGER_LABELS[triggerType] || triggerType;

    const claim = new Claim({
      userId: user._id,
      planId: plan._id,
      triggerType,
      triggerValue,
      hoursLost,
      amountClaimed,
      zone: zone || 'Chennai Central Zone',
      reason: `Income loss due to ${label}`,
      status: 'approved',
    });

    await claim.save();

    // Create instant payout
    const payout = new Payout({
      userId: user._id,
      claimId: claim._id,
      amount: amountClaimed,
      method: 'UPI',
      status: 'paid',
      processedAt: new Date(),
    });

    await payout.save();

    // Link payout to claim
    claim.payout = payout._id;
    claim.status = 'paid';
    await claim.save();

    res.status(201).json({
      success: true,
      message: 'Claim triggered and payout processed instantly!',
      claim: {
        _id: claim._id,
        triggerType: claim.triggerType,
        triggerValue: claim.triggerValue,
        hoursLost: claim.hoursLost,
        amountClaimed: claim.amountClaimed,
        zone: claim.zone,
        reason: claim.reason,
        transactionId: claim.transactionId,
        status: claim.status,
        createdAt: claim.createdAt,
      },
      payout: {
        _id: payout._id,
        amount: payout.amount,
        method: payout.method,
        status: payout.status,
        referenceId: payout.referenceId,
        processedAt: payout.processedAt,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getClaims, getClaim, triggerClaim };
