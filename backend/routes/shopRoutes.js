const express = require('express');
const router = express.Router();
const { createShop, updateShop, getMyShop, getAllShops, getShopById } = require('../controllers/shopController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createShop);
router.put('/', protect, updateShop);
router.get('/my-shop', protect, getMyShop);
router.get('/', protect, getAllShops); 
router.get('/:id', protect, getShopById);

module.exports = router;
