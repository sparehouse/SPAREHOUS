// src/index.js

require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const session = require('express-session');
const { connect } = require('./db');
const authRoutes = require('./routes/authRoutes');
const apartmentRoutes = require('./routes/apartmentRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(session({
  secret: '2e5ae7090f6d72092df82ccc868f2f2ae73a23ec148b123ad2680eb7c6c76ea3', // Replace 'your_secret_key_here' with your actual secret key
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  }
}));



app.use('/api/auth', authRoutes);
app.use('/api', apartmentRoutes);
app.use('/api/user', userRoutes);

connect();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
