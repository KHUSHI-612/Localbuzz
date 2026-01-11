const Order = require('../models/Order');


const createOrder = async (req, res) => {
    try {
        const { shopId, items, totalAmount } = req.body;

        const order = await Order.create({
            customer: req.user._id,
            shop: shopId,
            items,
            totalAmount,
            status: 'Pending'
        });

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getShopOrders = async (req, res) => {
    try {
        const Order = require('../models/Order');
        const Shop = require('../models/Shop');

        const shop = await Shop.findOne({ owner: req.user._id });
        if (!shop) {
            return res.status(404).json({ message: 'Shop not found' });
        }

      
        const orders = await Order.find({ shop: shop._id })
            .populate('customer', 'name email')
            .sort({ createdAt: -1 });

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if (order) {
            order.status = status;
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createOrder, getShopOrders, updateOrderStatus };
