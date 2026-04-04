const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getPlans, getPlan, subscribePlan } = require('../controllers/planController');

// GET /api/plans
router.get('/', getPlans);

// GET /api/plans/:id
router.get('/:id', getPlan);

// POST /api/plans/subscribe/:planId (protected)
router.post('/subscribe/:planId', protect, subscribePlan);

module.exports = router;
