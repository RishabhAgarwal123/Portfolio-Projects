const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter the product name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please enter the product description']
    },
    price: {
        type: Number,
        required: [true, 'Please enter the product price'],
        max: [99999999, 'Price cannot exceed 8 figures'] // Changed maxLength to max
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [
       {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
       }
    ],
    category: {
        type: String, // Fixed typre to type
        required: [true, 'Please enter product category']
    },
    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        max: [9999, 'Products stock cannot exceed 4 digits'], // Changed maxLength to max
        default: 1
    },
    numberOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', ProductSchema);