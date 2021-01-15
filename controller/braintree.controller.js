const User = require('../model/user.model');
const braintree = require('braintree');
require('dotenv').config();

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    publicKey: process.env.BTREE_PUBLIC_KEY,
    privateKey: process.env.BTREE_PRIVATE_KEY,
    merchantId: process.env.BREE_MERCHABT_ID
})

exports.generateToken = (req, res, next) => {
    gateway.clientToken.generate({}, function(err, response){
        if(err){
            res.status(500).send(err);
        }
        else{
            res.send(response);
        }
    })
}

exports.payment = (req, res, next) => {
    let nonce = req.body.paymentMethodNonce;
    let amount = req.body.amount;
    let newTransaction = gateway.transaction.sale({
        amount: amount,
        paymentMethodNonce: nonce,
        options: {
            submitForSettlement: true
        }
    }, (error, result)=>{
        if(error){
            res.status(500).json(error);
        }
        else{
            res.json(result);
        }
    })
}