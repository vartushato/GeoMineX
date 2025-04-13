const express = require('express');
const cors = require('cors');
const routes = require('./src/routes/index.js');
const { initDB } = require('./src/db/init.js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use('/api', routes);

initDB();

app.listen(PORT, () => {
  console.log(`✅ GeoMineX backend running on port ${PORT}`);
});
