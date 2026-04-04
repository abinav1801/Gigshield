const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plan',
      required: true,
    },
    // Trigger type
    triggerType: {
      type: String,
      enum: ['rain', 'heat', 'aqi', 'cyclone'],
      required: true,
    },
    // The actual weather value that triggered the claim
    triggerValue: {
      type: Number, // e.g. 65mm rainfall, 45°C temp, AQI 220
      required: true,
    },
    // Work interruption
    hoursLost: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },
    amountClaimed: {
      type: Number,
      required: true, // in INR (hoursLost * plan.coveragePerHour)
    },
    // Location info
    zone: {
      type: String,
      default: 'Chennai Central Zone',
    },
    reason: {
      type: String, // e.g. "Income loss due to Heavy Rain"
    },
    // Status flow: pending → approved → paid
    status: {
      type: String,
      enum: ['pending', 'approved', 'paid', 'rejected'],
      default: 'approved', // auto-approved for now
    },
    transactionId: {
      type: String,
      unique: true,
    },
    // Payout reference
    payout: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payout',
      default: null,
    },
  },
  { timestamps: true }
);

// Auto-generate transaction ID before save
claimSchema.pre('save', function (next) {
  if (!this.transactionId) {
    const random = Math.floor(10000 + Math.random() * 90000);
    this.transactionId = `#GS${random}`;
  }
  next();
});

module.exports = mongoose.model('Claim', claimSchema);
