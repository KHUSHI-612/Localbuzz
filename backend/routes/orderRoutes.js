const express = require('express');
const router = express.Router();
const { createOrder, getShopOrders, getCustomerOrders, updateOrderStatus, deleteOrder } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createOrder);
router.get('/shop', protect, getShopOrders);
router.get('/my-orders', protect, getCustomerOrders);
router.put('/:id/status', protect, updateOrderStatus);
router.delete('/:id', protect, deleteOrder);

module.exports = router;
