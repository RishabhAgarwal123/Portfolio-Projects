const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');

// Create product -- ADMIN
createProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.create(req.body);
    res.send({
        status: 201,
        success: true,
        message: 'Product created successfully',
        data: product
    })
});

// Get all products
getAllProducts = catchAsyncError(async (req, res, next) => {
    const products = await Product.find();
    res.send({
        success: true,
        status: 200,
        data: products,
        message: "Products list"
    });
});

// Get single Product
getProductById = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product)  return next(new ErrorHandler('Product Not Found!', 500));

    res.send({
        success: true,
        status: 200,
        data: product,
        message: "Product find successfully"
    });
});

// Update Product -- ADMIN
updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) return next(new ErrorHandler('Product Not Found!', 500));

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
});

// Delete Product -- ADMIN
deleteProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) return next(new ErrorHandler('Product Not Found!', 500));

    await product.deleteOne();

    return res.send({
        status: 200,
        success: true,
        message: 'Product delete successfully'
    });
});

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById
}