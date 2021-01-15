const express = require('express');
const { isAdmin, isAuth, requireSignin } = require('../controller/auth.controller');
const router = express.Router();
const { create, productById, get, remove, update, list, relatedProduct, listCategories, listBySearch, photo, listSearch } = require('../controller/product.controller');
const { userById } = require('../controller/user.controller');

router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create);

router.get('/product/:productId', get);

router.delete('/product/:productId/:userId', requireSignin, isAuth, isAdmin, remove);

router.put('/product/:productId/:userId', requireSignin, isAuth, isAdmin, update);

router.get('/products', list);

router.get('/products/search', listSearch)

router.get('/products/related/:productId', relatedProduct);

router.get('/products/categories', listCategories);

router.post("/products/by/search", listBySearch);

router.get('/products/photo/:productId', photo);

router.param('userId', userById);

router.param('productId', productById);

module.exports = router;