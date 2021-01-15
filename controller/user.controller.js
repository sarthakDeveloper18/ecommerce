const User = require('../model/user.model');
const {Order} = require('../model/order.model');
const { errorHandler } = require("../helpers/dbHelper");

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user)=>{
        if(err || !user) return res.status(400).json({err: 'User Not Found'});
        req.profile = user;
        next();
    })
}

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user)=>{
        if(err || !user) return res.status(400).json({err: 'User Not Found'});
        req.profile = user;
        next();
    })
}

exports.get = (req, res, next) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
}

exports.update = (req, res, next) => {
    User.findOneAndUpdate({_id: req.profile._id}, {$set: req.body}, {new: true}, (err, user)=>{
        if(err) return res.status(400).json({err: 'You are not authorized to perform this'});
        user.hashed_password = undefined;
        user.salt = undefined;
        return res.json(user);
    })
}

exports.addOrderToUserHistory = (req, res, next) => {
    let history = [];
    req.body.order.products.forEach(element => {
        history.push({
            _id: element._id,
            name: element.name,
            description: element.description,
            category: element.category,
            quantity: element.count,
            transaction_id: req.body.order.transaction_id,
            amount: req.body.order.amount
        })
    });
    User.findOneAndUpdate({_id: req.profile._id}, {$push: {history: history}}, {new: true}, (err, data)=>{
        if(err) return res.status(400).json({err: 'Could not update user purchase history'});
        next();
    })
}

exports.purchaseHistory = (req, res, next) => {
    Order.find({user: req.profile._id}).populate('user', '_id name').sort('-createdAt').exec((err, data)=>{
        if(err) return res.status(400).json({err: errorHandler(err)});
        res.json(data)
    })
}