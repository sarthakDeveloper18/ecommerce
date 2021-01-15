const express = require('express');
const { isAdmin, isAuth, requireSignin } = require('../controller/auth.controller');
const router = express.Router();
const { create, categoryById, get, update, remove, list } = require('../controller/category.controller'); 
const { userById } = require('../controller/user.controller');

router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);

router.get('/category/:categoryId', get);

router.put('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, update);

router.delete('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, remove);

router.get('/categories', list);

router.param('categoryId', categoryById);

router.param('userId', userById);

module.exports = router;