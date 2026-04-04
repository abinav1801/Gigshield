const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/plans', require('./routes/plans'));
app.use('/api/claims', require('./routes/claims'));
app.use('/api/weather', require('./routes/weather'));
app.use('/api/payouts', require('./routes/payouts'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'GigShield API is running 🛡️', status: 'ok' });
});

// Error handler
app.use(require('./middleware/errorHandler'));

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB connected successfully');

    // Seed plans if none exist
    const Plan = require('./models/Plan');
    const count = await Plan.countDocuments();
    if (count === 0) {
      await require('./utils/seedPlans')();
      console.log('✅ Plans seeded');
    }

    app.listen(PORT, () => {
      console.log(`🚀 GigShield API running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
