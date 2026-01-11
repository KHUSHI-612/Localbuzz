const Shop = require('../models/Shop');


const createShop = async (req, res) => {
    try {
        const { name, location, pincode, category, imageCategory } = req.body;

        const shopExists = await Shop.findOne({ owner: req.user._id });

        if (shopExists) {
            return res.status(400).json({ message: 'Shop already exists' });
        }

        const shop = await Shop.create({
            owner: req.user._id,
            name,
            location,
            pincode,
            category,
            imageCategory,
            tags: [category]
        });

        res.status(201).json(shop);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateShop = async (req, res) => {
    try {
        const shop = await Shop.findOne({ owner: req.user._id });

        if (shop) {
            shop.name = req.body.name || shop.name;
            shop.location = req.body.location || shop.location;
            shop.pincode = req.body.pincode || shop.pincode;
            shop.category = req.body.category || shop.category;
            shop.imageCategory = req.body.imageCategory || shop.imageCategory;
            shop.status = req.body.status || shop.status;

            if (req.body.category) {
                shop.tags = [req.body.category];
            }

            const updatedShop = await shop.save();
            res.json(updatedShop);
        } else {
            res.status(404).json({ message: 'Shop not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getMyShop = async (req, res) => {
    try {
        const shop = await Shop.findOne({ owner: req.user._id });
        if (shop) {
            res.json(shop);
        } else {
            res.status(404).json({ message: 'Shop not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllShops = async (req, res) => {
    try {
        const shops = await Shop.find({});
        res.json(shops);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getShopById = async (req, res) => {
    try {
        const shop = await Shop.findById(req.params.id);
        if (shop) {
            res.json(shop);
        } else {
            res.status(404).json({ message: 'Shop not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createShop, updateShop, getMyShop, getAllShops, getShopById };
