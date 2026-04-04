const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      unique: true,
      trim: true,
      match: [/^\d{10}$/, 'Phone must be 10 digits'],
    },
    platform: {
      type: String,
      enum: ['Zomato', 'Swiggy', 'Other'],
      default: 'Other',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpiry: {
      type: Date,
      default: null,
    },
    activePlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plan',
      default: null,
    },
    planSubscribedAt: {
      type: Date,
      default: null,
    },
    planExpiresAt: {
      type: Date,
      default: null,
    },
    // Weekly earnings (simulated for now)
    currentWeekEarnings: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Generate OTP and set expiry (10 minutes)
userSchema.methods.generateOTP = function () {
  const otp =
    process.env.OTP_MODE === 'fixed'
      ? process.env.FIXED_OTP || '123456'
      : Math.floor(100000 + Math.random() * 900000).toString();

  this.otp = otp;
  this.otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  return otp;
};

// Verify OTP
userSchema.methods.verifyOTP = function (inputOtp) {
  if (!this.otp || !this.otpExpiry) return false;
  if (new Date() > this.otpExpiry) return false;
  return this.otp === inputOtp;
};

// Clear OTP after use
userSchema.methods.clearOTP = function () {
  this.otp = null;
  this.otpExpiry = null;
};

module.exports = mongoose.model('User', userSchema);
