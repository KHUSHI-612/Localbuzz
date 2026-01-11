const express = require('express');
const router = express.Router();
const { createOrder, getShopOrders, updateOrderStatus } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createOrder);
router.get('/shop', protect, getShopOrders);
router.put('/:id/status', protect, updateOrderStatus);

module.exports = router;
