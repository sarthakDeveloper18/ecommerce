const express = require('express');
const router = express.Router();
const { requireSignin, isAuth, isAdmin } = require('../controller/auth.controller');
const { userById, addOrderToUserHistory } = require('../controller/user.controller');
const { create, listOrders, getStatusValues, updateOrderStatus, orderById } = require('../controller/order.controller.js');
const { decreaseQuantity } = require('../controller/product.controller.js')

router.post('/order/create/:userId', requireSignin, isAuth, addOrderToUserHistory, decreaseQuantity, create);

router.get('/order/list/:userId', requireSignin, isAuth, isAdmin, listOrders);

router.get('/order/status-values/:userId', requireSignin, isAuth, isAdmin, getStatusValues);

router.put('/order/:orderId/status/:userId', requireSignin, isAuth, isAdmin, updateOrderStatus);

router.param('userId', userById);

router.param('orderId', orderById);

module.exports = router;