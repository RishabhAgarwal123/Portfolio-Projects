const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');

// Create order
newOrder = catchAsyncError(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    });

    res.send({
        status: 201,
        success: true,
        order
    })
});

// Get Single Order
getSingleOrder = catchAsyncError(async (req, res, next) => {
    const id = req.params.id
    const order = await Order.findById(id).populate('user', "name email");

    if (!order) return next(new ErrorHandler(`No order found with ID: ${id}`, 400));

    res.send({
        status: 200,
        success: true,
        order
    })
});

// Get Logged In User Order
myOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({
        user: req.user._id
    });

    res.send({
        status: 200,
        success: true,
        orders
    })
});

// Get all Order
allOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;
    orders.forEach((order) => {
        totalAmount += order.totalPrice
    });

    res.send({
        status: 200,
        success: true,
        orders,
        totalAmount
    })
});

// Update orders statu -- admin
updateOrder = catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    const order = await Order.findById(id);

    if (order.orderStatus === 'Delivered') return next(new ErrorHandler('You have already delivered this orded', 404));

    order.orderItems.forEach(async (order) => {
        await updateStock(order.product, order.quantity);
    })

    order.orderStatus = req.body.status;

    if (req.body.status === 'Delivered') {
        order.deliveredAt = Date.now()
    }

    await order.save({validateBeforeSave: false});

    res.send({
        status: 200,
        success: true,
        order
    })
});

const updateStock = async (productId, quantity) => {
    const product = await Product.findById(productId);

    product.stock -= quantity;

    await product.save({validateBeforeSave: false});
}

// Delete orders statu -- admin
deleteOrder = catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    const order = await Order.findById(id);

    if (!order) return next(new ErrorHandler(`No order found with ID: ${id}`, 400));

    await order.deleteOne();

    res.send({
        status: 200,
        success: true,
    })
});

module.exports = {
    newOrder,
    getSingleOrder,
    myOrders,
    allOrders,
    updateOrder,
    deleteOrder
}