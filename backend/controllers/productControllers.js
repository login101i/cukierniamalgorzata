const Product = require('../models/product')
const ErrorHandler = require("../utils/ErrorHandler")




exports.getProducts = async (req, res, next) => {

    const products = await Product.find()
    const productsCount = await Product.countDocuments();

    res.status(200).json({
        success: true,
        productsCount,
        products,


    })
}


exports.newProduct = async (req, res, next) => {

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
}

exports.getSingleProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    console.log(product)

    if (!product) {
        // constructor(message, statusCode)
        return next(new ErrorHandler("Nie odnaleziono produktu", 404))
    }
    res.status(200).json({
        success: true,
        product
    })
}



// Update Product   =>   /api/v1/admin/product/:id
exports.updateProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Nie odnaleziono produktu takiego produktu do zaktualizowania", 404))
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })
}

// Delete Product   =>   /api/v1/admin/product/:id
exports.deleteProduct = async (req, res, next) => {

    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Nie odnaleziono produktu do usunięcia", 404))
    }
    product = await product.remove()
    res.status(200).json({
        message: "Pomyślnie usunięto poniższy produkt",
        product
    })
}
