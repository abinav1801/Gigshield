const mongoose = require('mongoose');

const payoutSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    claimId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Claim',
      required: true,
    },
    amount: {
      type: Number,
      required: true, // in INR
    },
    method: {
      type: String,
      enum: ['UPI', 'bank', 'wallet'],
      default: 'UPI',
    },
    status: {
      type: String,
      enum: ['processing', 'paid', 'failed'],
      default: 'paid', // instant payout simulation
    },
    upiId: {
      type: String,
      default: null,
    },
    processedAt: {
      type: Date,
      default: Date.now,
    },
    referenceId: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

// Auto-generate reference ID
payoutSchema.pre('save', function (next) {
  if (!this.referenceId) {
    const random = Math.floor(100000000 + Math.random() * 900000000);
    this.referenceId = `PAY${random}`;
  }
  next();
});

module.exports = mongoose.model('Payout', payoutSchema);
