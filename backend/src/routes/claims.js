const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getClaims, getClaim, triggerClaim } = require('../controllers/claimController');

// GET /api/claims  (all user claims)
router.get('/', protect, getClaims);

// POST /api/claims/trigger
router.post('/trigger', protect, triggerClaim);

// GET /api/claims/:id
router.get('/:id', protect, getClaim);

module.exports = router;
