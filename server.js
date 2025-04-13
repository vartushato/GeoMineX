import express from 'express';
import cors from 'cors';
import routes from './src/routes/index.js';
import { initDB } from './src/db/init.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use('/api', routes);

initDB();

app.listen(PORT, () => {
  console.log(`✅ GeoMineX backend running on port ${PORT}`);
});
