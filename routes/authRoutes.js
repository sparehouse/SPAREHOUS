// src/routes/authRoutes.js

const express = require('express');
const { signup, login,getUserDetails, updateName, updatePassword, deleteAccount } = require('../controllers/authController');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/details', authenticate, getUserDetails);
router.put('/name', authenticate, updateName);
router.put('/password', authenticate, updatePassword);
router.delete('/delete', authenticate, deleteAccount);
module.exports = router;
