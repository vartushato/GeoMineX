import express from 'express';
import { db } from '../db/init.js';
const router = express.Router();

router.post('/bonus', async (req, res) => {
  const { referrer_id, referred_user_id, mining_earnings } = req.body;

  const bonus = parseFloat(mining_earnings) * 0.05;

  const result = await db.query(
    `INSERT INTO referral_mappings 
     (referrer_id, referred_user_id, mining_earnings, bonus_credited)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [referrer_id, referred_user_id, mining_earnings, bonus]
  );

  // Log referral bonus in transaction history
  await db.query(
    `INSERT INTO transactions 
     (user_id, transaction_type, amount, fee, status)
     VALUES ($1, $2, $3, $4, $5)`,
    [referrer_id, 'referral_bonus', bonus, 0, 'credited']
  );

  res.json(result.rows[0]);
});

export default router;
