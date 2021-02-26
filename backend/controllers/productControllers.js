const Product = require('../models/product')
const ErrorHandler = require("../utils/ErrorHandler")
const catchAsynchErrors = require("../middlewares/catchAsyncErrors")
const APIFeatures = require("../utils/apiFeatures")





// Get all products   =>   /api/v1/products?keyword=apple
exports.getProducts = catchAsynchErrors(async (req, res, next) => {

    const resPerPage = 9;
    const productsCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resPerPage)

    let products = await apiFeatures.query;


    res.status(200).json({
        success: true,
        productsCount,
        products,
        resPerPage
    })


})


exports.newProduct = catchAsynchErrors(async (req, res, next) => {

      // teraz dodaliśmy do modelu produktu user'a i możemy do req.body.user przypisać id użytkownika zalogowanego czyli req.user.id
    req.body.user=req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
})

exports.getSingleProduct = catchAsynchErrors(async (req, res, next) => {
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
})



// Update Product   =>   /api/v1/admin/product/:id
exports.updateProduct = catchAsynchErrors(async (req, res, next) => {
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
})

// Delete Product   =>   /api/v1/admin/product/:id
exports.deleteProduct = catchAsynchErrors(async (req, res, next) => {

    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Nie odnaleziono produktu do usunięcia", 404))
    }
    product = await product.remove()
    res.status(200).json({
        message: "Pomyślnie usunięto poniższy produkt",
        product
    })
})
