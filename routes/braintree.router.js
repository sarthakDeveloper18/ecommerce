const express = require('express');
const { requireSignin, isAuth } = require('../controller/auth.controller');
const { userById } = require('../controller/user.controller');
const router = express.Router();
const { generateToken, payment } = require('../controller/braintree.controller'); 

router.get('/braintree/getToken/:userId', requireSignin, isAuth, generateToken);

router.post('/braintree/payment/:userId', requireSignin, isAuth, payment);

router.param('userId', userById);

module.exports = router;