const {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    createAndUpdateReview
} = require('../controllers/productController');

const express = require('express');
const { isAuthenticatedUser, authorization } = require('../middleware/authMiddleware');
const router = express.Router();

// Routes
router.route('/products/new').post(isAuthenticatedUser, authorization('admin'), createProduct);
router.route('/products/:id').put(isAuthenticatedUser, authorization('admin'), updateProduct);
router.route('/products/:id').delete(isAuthenticatedUser, authorization('admin'), deleteProduct);

router.route('/products/reviews').put(isAuthenticatedUser, createAndUpdateReview);

router.route('/products').get(getAllProducts);
router.route('/products/:id').get(getProductById);

module.exports = router;