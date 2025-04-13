const express = require('express');
const userRoutes = require('./users.js');
const miningRoutes = require('./mining.js');
const withdrawalRoutes = require('./withdrawals.js');
const referralRoutes = require('./referrals.js');
const adminRoutes = require('./admin.js');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/mining', miningRoutes);
router.use('/withdrawals', withdrawalRoutes);
router.use('/referrals', referralRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
