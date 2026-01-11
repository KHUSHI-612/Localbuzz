const Product = require('../models/Product');
const Shop = require('../models/Shop');


const addProduct = async (req, res) => {
    try {
        const { name, price, unit, image } = req.body;

        const shop = await Shop.findOne({ owner: req.user._id });
        if (!shop) {
            return res.status(404).json({ message: 'Shop not found' });
        }

        const product = await Product.create({
            shop: shop._id,
            name,
            price,
            unit,
            image
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getShopProducts = async (req, res) => {
    try {
        const products = await Product.find({ shop: req.params.shopId });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

    
        const shop = await Shop.findOne({ owner: req.user._id });
        if (!shop || product.shop.toString() !== shop._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await product.deleteOne(); 
        res.json({ message: 'Product removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addProduct, getShopProducts, deleteProduct };
