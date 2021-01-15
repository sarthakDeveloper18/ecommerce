const Category = require('../model/category.model');
const {errorHandler} = require('../helpers/dbHelper');

exports.create = (req, res, next) => {
    const category = new Category(req.body);
    category.save((err, data)=>{
        if(err) return res.status(400).json({err: errorHandler(err)});
        res.json({data});
    })
}

exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category)=>{
        if(err || !category) return res.status(400).json({err: 'Category does not exist'});
        req.category = category;
        next();
    })
}

exports.get = (req, res, next) => {
    return res.json(req.category);
}

exports.update = (req, res, next) => {
    const category = req.category;
    category.name = req.body.name;
    category.save((err, data)=>{
        if(err) return res.status(400).json({err: errorHandler(err)});
        res.json(data);
    })
}  

exports.remove = (req, res, next) => {
    const category = req.category;
    category.remove((err, data)=>{
        if(err) return res.status(400).json({err: errorHandler(err)});
        res.json({message: 'Category deleted Successfully'});
    })
}

exports.list = (req, res, next) => {
    Category.find().exec((err, data)=>{
        if(err) return res.status(400).json({err: errorHandler(err)});
        res.json(data)
    })
}

