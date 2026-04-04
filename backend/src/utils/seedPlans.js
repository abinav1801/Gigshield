const dotenv = require('dotenv');
dotenv.config({ path: require('path').join(__dirname, '../../.env') });

const mongoose = require('mongoose');
const Plan = require('../models/Plan');

const plans = [
  {
    name: 'Basic Plan',
    slug: 'basic',
    weeklyPrice: 15,
    coveragePerDay: 450,
    coveragePerHour: 56.25,
    description: 'Essential coverage for gig workers',
    features: [
      'Rain coverage (>50mm)',
      'Up to ₹450/day income protection',
      'Instant claim submission',
      'SMS notifications',
    ],
    triggerConditions: {
      rainThresholdMm: 50,
      heatThresholdC: 45,
      aqiThreshold: 300,
      cycloneAlert: false,
    },
    popular: false,
  },
  {
    name: 'Standard Plan',
    slug: 'standard',
    weeklyPrice: 25,
    coveragePerDay: 900,
    coveragePerHour: 112.5,
    description: 'Best value for active gig workers',
    features: [
      'Rain coverage (>50mm)',
      'Extreme heat coverage (>42°C)',
      'Up to ₹900/day income protection',
      'Instant payouts to UPI',
      'AI Risk Alerts',
      '24/7 support',
    ],
    triggerConditions: {
      rainThresholdMm: 50,
      heatThresholdC: 42,
      aqiThreshold: 200,
      cycloneAlert: false,
    },
    popular: true,
  },
  {
    name: 'Premium Plan',
    slug: 'premium',
    weeklyPrice: 45,
    coveragePerDay: 1800,
    coveragePerHour: 225,
    description: 'Maximum protection including cyclone alerts',
    features: [
      'Rain coverage (>50mm)',
      'Extreme heat coverage (>40°C)',
      'Air pollution (AQI >150)',
      'Cyclone alert coverage',
      'Up to ₹1800/day income protection',
      'Priority instant payouts',
      'Dedicated support agent',
      'Family emergency add-on',
    ],
    triggerConditions: {
      rainThresholdMm: 50,
      heatThresholdC: 40,
      aqiThreshold: 150,
      cycloneAlert: true,
    },
    popular: false,
  },
];

const seedPlans = async () => {
  await Plan.deleteMany({});
  await Plan.insertMany(plans);
  console.log('✅ Plans seeded successfully');
};

// Run directly if called as script
if (require.main === module) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(async () => {
      await seedPlans();
      mongoose.disconnect();
    })
    .catch((err) => {
      console.error('Seed failed:', err);
      process.exit(1);
    });
}

module.exports = seedPlans;
