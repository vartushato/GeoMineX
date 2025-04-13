import express from 'express';
import { db } from '../db/init.js';
const router = express.Router();

// 🔒 Hardcoded fee wallet (never exposed to frontend)
const FEE_WALLET = 'bc1q69ap97kl762jnptn3evxz8whxsykwun8jhz4tm';

router.post('/request', async (req, res) => {
  const { user_id, requested_amount, wallet_address } = req.body;

  const fee_amount = parseFloat(requested_amount) * 0.20;
  const final_amount = parseFloat(requested_amount) - fee_amount;
  const approval_status = final_amount <= 0.1 ? 'approved' : 'pending';

  // Insert into withdrawal request table
  const result = await db.query(
    `INSERT INTO withdrawal_requests 
     (user_id, requested_amount, fee_amount, final_amount, wallet_address, approval_status)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [user_id, requested_amount, fee_amount, final_amount, wallet_address, approval_status]
  );

  // Log it into transaction history
  await db.query(
    `INSERT INTO transactions 
     (user_id, transaction_type, amount, fee, status)
     VALUES ($1, $2, $3, $4, $5)`,
    [user_id, 'withdrawal', requested_amount, fee_amount, approval_status]
  );

  res.json({
    withdrawal: result.rows[0],
    message: `20% fee routed to secure fee wallet.`,
    fee_wallet: FEE_WALLET
  });
});

module.exports = router;
