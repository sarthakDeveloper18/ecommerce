const { errorHandler } = require("../helpers/dbHelper");
const {Order, CartItem} = require('../model/order.model');

exports.create = (req, res, next) => {
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((err, data)=>{
        if(err) return res.status(400).json({err: errorHandler(err)});
        res.json(data)
    })
}

exports.listOrders = (req, res, next) => {
    Order.find().populate('user', '_id name address').sort('-created').exec((err, data)=>{
        if(err) return res.status(400).json({err: errorHandler(err)});
        res.json(data)
    })
}

exports.getStatusValues = (req, res, next) => {
    res.json(Order.schema.path('status').enumValues)
}

exports.orderById = (req, res, next, id) => {
    Order.findById(id).populate('products.product', 'name price').exec((err, data)=>{
        if(err || !data) return res.status(400).json({err: errorHandler(err)});
        req.order = data;
        next();
    })
}

exports.updateOrderStatus = (req, res, next) => {
    Order.update({_id: req.body.orderId}, {$set: {status: req.body.status}}, (err, data)=>{
        console.log("************")
        console.log(err)
        console.log("************")
        if(err) return res.status(400).json({err: errorHandler(err)});
        res.json(data)
    })
}