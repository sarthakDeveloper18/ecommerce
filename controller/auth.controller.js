const User = require('../model/user.model');
const {errorHandler} = require('../helpers/dbHelper');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signup = (req, res, next) => {
    const user = new User(req.body);
    user.save((err, user)=>{
        if(err) return res.status(400).json({err: errorHandler(err)});
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({user});
    })
}

exports.signin = (req, res, next) => {
    const {email, password} = req.body;
    User.findOne({email}, (err, user)=>{
        if(err || !user) return res.status(400).json({err: 'Email does not exist. Please Sign Up'});
        if(!user.authenticate(password)){
            return res.status(401).json({err: 'Email and password does not match'});
        }
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
        res.cookie('t', token, {expire: new Date() + 9999});
        const {_id, name, email, role} = user;
        return res.json({token, user: {_id, email, name, role}});
    })
}

exports.signout = (req, res, next) => {
    res.clearCookie('t');
    res.json({message: 'Sign Out Successfully'});
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth',
    algorithms: ["HS256"],
})

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!user) return res.status(403).json({err: 'Access Denied'});
    next();
}

exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0){
        return res.status(403).json({err: 'Admin Resource. Access Denied'});
    }
    next();
}