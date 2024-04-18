// src/index.js

require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const { connect } = require('./db');
const authRoutes = require('./routes/authRoutes');
const apartmentRoutes = require('./routes/apartmentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api', apartmentRoutes);

connect();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
