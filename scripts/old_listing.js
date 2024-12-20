const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    image: String,
    badges: [String],
    title: String,
    rating: String,
    reviews: String,
    duration: String,
    author: String,
    description: String,
    price: String,
    standard: {
        price: String,
        description: String,
        features: [String],
        delivery: String
    },
    strengths: String
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;















// const mongoose = require('mongoose');

// const listingSchema = new mongoose.Schema({
//     image: { 
//         type: String, 
//         required: true 
//     },
//     badges: { 
//         type: [String], 
//         required: true 
//     },
//     title: { 
//         type: String, 
//         required: true 
//     },
//     rating: { 
//         type: String, 
//         default: 'N/A' 
//     },
//     reviews: { 
//         type: String, 
//         default: '0' 
//     },
//     duration: { 
//         type: String, 
//         default: 'Flexible' 
//     },
//     author: { 
//         type: String, 
//         required: true 
//     },
//     description: { 
//         type: String, 
//         required: true 
//     },
//     price: { 
//         type: String, 
//         required: true 
//     },
//     standard: {
//         price: { 
//             type: String, 
//             required: true 
//         },
//         description: { 
//             type: String, 
//             required: true 
//         },
//         features: { 
//             type: [String], 
//             required: true 
//         },
//         delivery: { 
//             type: String, 
//             required: true 
//         }
//     },
//     strengths: { 
//         type: String, 
//         required: true 
//     }
// }, { timestamps: true });

// const Listing = mongoose.model('Listing', listingSchema);

// module.exports = Listing;