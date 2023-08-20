const {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById
} = require('../controllers/productController');

const express = require('express');
const router = express.Router();

// Routes
router.route('/products/new').post(createProduct);
router.route('/products/:id').put(updateProduct);
router.route('/products/:id').delete(deleteProduct);
router.route('/products').get(getAllProducts);
router.route('/products/:id').get(getProductById);

module.exports = router;