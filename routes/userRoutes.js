// src/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { getUserDetails, updateName, updatePassword, deleteAccount } = require('../controllers/userController');
const { authenticate } = require('../middlewares/authMiddleware');

router.get('/details', authenticate, getUserDetails);
router.put('/name', authenticate, updateName);
router.put('/password', authenticate, updatePassword);
router.delete('/delete', authenticate, deleteAccount);

module.exports = router;
