const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment, getOrders, verifyUpi, trackOrder, getMyOrders } = require('../controllers/paymentController');

router.post('/order', createOrder);
router.post('/verify', verifyPayment);
router.get('/orders', getOrders);
router.post('/verify-upi', verifyUpi);
router.get('/track/:orderId', trackOrder);
router.get('/my-orders/:email', getMyOrders);

module.exports = router;
