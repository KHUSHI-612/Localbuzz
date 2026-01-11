const express = require('express');
const router = express.Router();
const { addProduct, getShopProducts, deleteProduct } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, addProduct);
router.get('/:shopId', protect, getShopProducts); 
router.delete('/:id', protect, deleteProduct);

module.exports = router;
