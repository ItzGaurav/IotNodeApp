const Product  = require('../models/product.model');

exports.test = (req,res) => {
    res.send('greetings of the day');
}

exports.product_create = (req,res,next) => {
    let product = new Product(
        {
            tyreid : req.body.tyreid,
            pressure : req.body.pressure 
        }
    );

    product.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    });
}


exports.product_details = function (req, res, next) {
    Product.find({tyreid: req.body.tyreid}, function (err, product) {
        if (err) return next(err);
        res.send(product);
    })
};