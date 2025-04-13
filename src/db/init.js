const pg = require('pg');
const { Pool } = pg;

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const initDB = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      registration_type TEXT,
      wallet_address TEXT,
      referral_code TEXT,
      registration_timestamp TIMESTAMPTZ DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS transactions (
      id SERIAL PRIMARY KEY,
      user_id INTEGER,
      transaction_type TEXT,
      amount NUMERIC,
      fee NUMERIC,
      status TEXT,
      timestamp TIMESTAMPTZ DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS withdrawal_requests (
      id SERIAL PRIMARY KEY,
      user_id INTEGER,
      requested_amount NUMERIC,
      fee_amount NUMERIC,
      final_amount NUMERIC,
      wallet_address TEXT,
      approval_status TEXT,
      timestamp TIMESTAMPTZ DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS referral_mappings (
      id SERIAL PRIMARY KEY,
      referrer_id INTEGER,
      referred_user_id INTEGER,
      mining_earnings NUMERIC DEFAULT 0,
      bonus_credited NUMERIC DEFAULT 0,
      timestamp TIMESTAMPTZ DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS mining_logs (
      id SERIAL PRIMARY KEY,
      active_coin TEXT,
      hash_rate NUMERIC,
      estimated_earnings NUMERIC,
      mining_duration INTERVAL,
      api_log JSONB,
      timestamp TIMESTAMPTZ DEFAULT now()
    );
  `);
  console.log('✅ Database initialized');
};

module.exports = { db, initDB };
