const Product = require('../models/productModel');

// Create product -- ADMIN
createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        res.send({
            status: 201,
            success: true,
            message: 'Product created successfully',
            data: product
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
            data: null
        })
    }
}

// Get all products
getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.send({
            success: true,
            status: 200,
            data: products,
            message: "Products list"
        });
    } catch (error) {
        res.send({
            success: false,
            data: null,
            message: error.message
        })
    }
}

// Get single Product
getProductById = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.send({
                status: 500,
                success: false,
                data: null,
                message: 'Product not found'
            });
        }

        res.send({
            success: true,
            status: 200,
            data: product,
            message: "Product find successfully"
        });

    } catch (error) {
        res.send({
            success: false,
            data: null,
            message: error.message
        })
    }
}

// Update Product -- ADMIN
updateProduct = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.send({
                status: 500,
                success: false,
                data: null,
                message: 'Product not found'
            });
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

        res.send({
            success: true,
            status: 200,
            data: product,
            message: "Products list"
        });
    } catch (error) {
        res.send({
            success: false,
            data: null,
            message: error.message
        })
    }
}

// Delete Product -- ADMIN
deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.send({
                status: 500,
                success: false,
                message: 'Product not found'
            });
        }

        await product.deleteOne();

        return res.send({
            status: 200,
            success: true,
            message: 'Product delete successfully'
        });

    } catch (error) {
        res.send({
            success: false,
            data: null,
            message: error.message
        })
    }
}

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById
}