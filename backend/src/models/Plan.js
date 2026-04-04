const mongoose = require('mongoose');

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    weeklyPrice: {
      type: Number,
      required: true, // in INR
    },
    coveragePerDay: {
      type: Number,
      required: true, // in INR
    },
    coveragePerHour: {
      type: Number,
      required: true, // in INR
    },
    description: {
      type: String,
    },
    features: {
      type: [String],
      default: [],
    },
    triggerConditions: {
      rainThresholdMm: { type: Number, default: 50 },
      heatThresholdC: { type: Number, default: 42 },
      aqiThreshold: { type: Number, default: 200 },
      cycloneAlert: { type: Boolean, default: true },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    popular: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Plan', planSchema);
