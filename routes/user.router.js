const express = require('express');
const router = express.Router();
const { userById, get, update, purchaseHistory } = require('../controller/user.controller');
const { requireSignin, isAuth, isAdmin } = require('../controller/auth.controller');

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res, next)=>{
    res.json({user: req.profile});
})

router.get('/user/:userId', requireSignin, isAuth, get);

router.put('/user/:userId', requireSignin, isAuth, update);

router.get('/orders/by/user/:userId', requireSignin, isAuth, purchaseHistory);

router.param('userId', userById);

module.exports = router;