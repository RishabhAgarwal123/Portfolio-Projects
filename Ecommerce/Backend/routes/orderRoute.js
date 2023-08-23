const express = require('express');
const { isAuthenticatedUser, authorization } = require('../middleware/authMiddleware');
const { 
    newOrder, 
    getSingleOrder, 
    myOrders, 
    allOrders,
    updateOrder,
    deleteOrder
} = require('../controllers/orderController');
const router = express.Router();

router.route('/orders/me').get(isAuthenticatedUser, myOrders);
router.route('/order/new').post(isAuthenticatedUser, newOrder);
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);

router.route('/admin/orders').get(isAuthenticatedUser, authorization('admin'), allOrders);
router.route('/admin/orders/:id').put(isAuthenticatedUser, authorization('admin'), updateOrder);
router.route('/admin/orders/:id').delete(isAuthenticatedUser, authorization('admin'), deleteOrder);

module.exports = router;