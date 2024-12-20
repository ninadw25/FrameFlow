const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    image: { type: String, required: true },
    badges: { type: [String], required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    standard: {
        price: { type: String, required: true },
        description: { type: String, required: true },
        features: { type: [String], required: true },
        delivery: { type: String, required: true }
    },
    strengths: { type: String, required: true },
    rating: { type: String, default: '4.5' },
    reviews: { type: String, default: '50' },
    duration: { type: String, default: '2-3 hours' }
}, { timestamps: true });

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;