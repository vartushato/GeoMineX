import express from 'express';
import userRoutes from './users.js';
import miningRoutes from './mining.js';
import withdrawalRoutes from './withdrawals.js';
import referralRoutes from './referrals.js';
import adminRoutes from './admin.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/mining', miningRoutes);
router.use('/withdrawals', withdrawalRoutes);
router.use('/referrals', referralRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
