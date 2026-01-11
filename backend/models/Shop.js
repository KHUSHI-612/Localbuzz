const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    tags: [String],
    status: {
        type: String,
        enum: ['Open', 'Closed'],
        default: 'Open'
    },
    rating: {
        type: Number,
        default: 4.5
    },
    imageCategory: {
        type: String,
        required: true
    },
    time: {
        type: String,
        default: '30-45 min'
    },
    distance: {
        type: String,
        default: 'Nearby'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Shop', shopSchema);
