import express from 'express';
import axios from 'axios';
import { db } from '../db/init.js';
const router = express.Router();

router.get('/profitability', async (req, res) => {
  try {
    const { data } = await axios.get('https://api.nicehash.com/api?method=stats.provider.workers');
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Profitability fetch failed' });
  }
});

router.post('/log', async (req, res) => {
  const { active_coin, hash_rate, estimated_earnings, mining_duration, api_log } = req.body;
  const result = await db.query(
    'INSERT INTO mining_logs (active_coin, hash_rate, estimated_earnings, mining_duration, api_log) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [active_coin, hash_rate, estimated_earnings, mining_duration, api_log]
  );
  res.json(result.rows[0]);
});

module.exports = router;
