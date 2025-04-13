import express from 'express';
import { db } from '../db/init.js';
const router = express.Router();

router.post('/register', async (req, res) => {
  const { registration_type, wallet_address, referral_code } = req.body;
  const result = await db.query(
    'INSERT INTO users (registration_type, wallet_address, referral_code) VALUES ($1, $2, $3) RETURNING *',
    [registration_type, wallet_address, referral_code]
  );
  res.json(result.rows[0]);
});

router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM users');
  res.json(result.rows);
});

export default router;
