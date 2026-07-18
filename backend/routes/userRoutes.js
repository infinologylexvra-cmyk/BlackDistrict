const express = require('express');
const router = express.Router();
const { registerUser, loginUser, sendOtp, verifyOtp } = require('../controllers/userController');

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);

module.exports = router;
