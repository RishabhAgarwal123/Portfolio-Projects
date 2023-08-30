const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const Features = require('../utils/features');

// Create product -- ADMIN
createProduct = catchAsyncError(async (req, res, next) => {
    // Assining user
    req.body.user = req.user.id;

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
    // For Pagination
    const resultPerPage = 2;
    const productCount = await Product.countDocuments();

    // Search and filter
    const apiFeature = new Features(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);
    const products = await apiFeature.query;;
    res.send({
        success: true,
        status: 200,
        data: products,
        productCount: productCount,
        resultPerPage: resultPerPage,
        message: "Products list"
    });
});

// Get single Product
getProductById = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) return next(new ErrorHandler('Product Not Found!', 500));

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

// Create new review or update the review
createProductReview = catchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user._id, 
        name: req.user.name,
        rating: Number(rating),
        comment,
    }

    const product = await Product.findById(productId);

    // Checking if user already provided a review
    const isReviewed = product.reviews.find(review => review.user.toString() === req.user._id.toString());
        
    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.rating = rating;
                review.comment = comment;
            }
        });
    } else {
        product.reviews.push(review);
        product.numberOfReviews = product.reviews.length;
    }

    let sumRatings = 0;
    product.reviews.forEach(review => {
        sumRatings += review.rating;
    });

    product.ratings = sumRatings / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.send({
        status: 200,
        success: true,
        product
    });
});

// Get all review of a single product
getAllReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) return next(new ErrorHandler('Product not found', 400));

    res.send({
       success: true,
       status: 200,
       reviews: product.reviews 
    });
});

// Delete reviews
deleteReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) return next(new ErrorHandler('Product not found', 400));

    const reviews = product.reviews.filter((review) => review._id.toString() !== req.query.id.toString());

    let sumRatings = 0;
    reviews.forEach(review => {
        sumRatings += review.rating;
    });

    // Updating reviews ratings
    const ratings = sumRatings / reviews.length;
    const numberOfReviews = reviews.length

    await Product.findByIdAndUpdate(req.query.productId, {
        ratings,
        reviews,
        numberOfReviews
    }, { new: true, runValidators: true, useFindAndModify: false })

    res.send({
       success: true,
       status: 200,
       message: 'Review deleted successfully'
    });
});

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    createProductReview,
    getAllReviews,
    deleteReview
}