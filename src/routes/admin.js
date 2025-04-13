import express from 'express';
import { db } from '../db/init.js';
const router = express.Router();

// GET full admin dashboard data
router.get('/dashboard', async (req, res) => {
  const users = await db.query('SELECT * FROM users');
  const withdrawals = await db.query('SELECT * FROM withdrawal_requests');
  const transactions = await db.query('SELECT * FROM transactions');

  res.json({
    users: users.rows,
    withdrawals: withdrawals.rows,
    transactions: transactions.rows
  });
});

// POST manual approval for high-value withdrawal
router.post('/approve/:id', async (req, res) => {
  const id = req.params.id;

  await db.query(
    `UPDATE withdrawal_requests 
     SET approval_status = $1 
     WHERE id = $2`,
    ['approved', id]
  );

  res.json({ status: 'approved', withdrawal_id: id });
});

module.exports = router;
