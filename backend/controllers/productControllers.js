const Product = require('../models/product')
const Coupon = require("../models/coupon");
const ErrorHandler = require("../middlewares/ErrorHandler2")
const catchAsynchErrors = require("../middlewares/catchAsyncErrors")
const APIFeatures = require("../utils/apiFeatures")
const cloudinary = require('cloudinary')






// Get all products   =>   /api/v1/products?keyword=apple
exports.getProducts = catchAsynchErrors(async (req, res, next) => {

    const resPerPage = 6;
    const productsCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()



    let products = await apiFeatures.query;
    let filteredProductsCount = products.length

    apiFeatures.pagination(resPerPage)
    products = await apiFeatures.query

    res.status(200).json({
        success: true,
        productsCount,
        products,
        resPerPage,
        filteredProductsCount
    })

})

exports.newProduct = catchAsynchErrors(async (req, res, next) => {
    // teraz dodaliśmy do modelu produktu user'a i możemy do req.body.user przypisać id użytkownika zalogowanego czyli req.user.id
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
})

exports.getSingleProduct = catchAsynchErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id)

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
        return next(new ErrorHandler('Product not found', 404));
    }

    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    if (images !== undefined) {

        // Deleting images associated with the product
        for (let i = 0; i < product.images.length; i++) {
            const result = await cloudinary.uploader.destroy(product.images[i].public_id)
        }

        let imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.uploader.upload(images[i], {
                folder: 'products'
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        req.body.images = imagesLinks

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


    // delete images
    for (let i = 0; i < product.images.length; i++) {
        const result = await cloudinary.uploader.destroy(product.images[i].public_id)
    }

    product = await product.remove()
    res.status(200).json({
        message: "Pomyślnie usunięto poniższy produkt",
        product,
        success: true,

    })
})

exports.applyCouponToUserCart = catchAsynchErrors(async (req, res, next) => {
    const { coupon } = req.body;
    const { cartTotal } = req.body;




    const validCoupon = await Coupon.findOne({ name: coupon }).exec();
    // możesz zrobić też to poniższym sposobem
    // if (validCoupon === null) {
    //     return res.json({
    //         err: "Kupon nie jest prawidłowy.",
    //     });
    // }
    if (!validCoupon) {
        res.status(200).json({
            message: "Error",

        })
        return next(new ErrorHandler("Nie odnaleziono takiego kuponu", 404))

    }
    // console.log("_ _ 8 KUPON JEST OK ", validCoupon);
    // console.log("discount w %", validCoupon.discount);
    let totalAfterDiscount = (
        cartTotal -
        (cartTotal * validCoupon.discount) / 100
    ).toFixed(2); // 99.99
    // console.log(" _ _ 10 ----------> ", totalAfterDiscount);

    res.status(200).json({
        message: "Pomyślnie znaleziono cupon",
        totalAfterDiscount
    })
});


// --------------------------------------------------------

// / / Create new review   => /api / v1 / review
exports.createProductReview = catchAsynchErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
        // here what is r.user ?? id?
    )

    // Here we set new comment and rating for comment by this user
    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        })

    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: `Twoja dodana opinia to: ${comment} z oceną ${rating}`
    })
})


// Get Product Reviews   =>   /api/v1/reviews
exports.getProductReviews = catchAsynchErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

// Delete Product Review   =>   /api/v1/reviews
exports.deleteReview = catchAsynchErrors(async (req, res, next) => {

    // jeden jest id produktu a jeden id review, nie pojeb się :) 
    // {{DOMAIN}}/api/v1/review?productId=6014c71c3f26980af475a7cb&id=6015b91b7cb1c027b4657844
    const product = await Product.findById(req.query.productId);


    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());

    const numOfReviews = reviews.length;

    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})

exports.getAdminProducts = catchAsynchErrors(async (req, res, next) => {

    const products = await Product.find();

    res.status(200).json({
        success: true,
        products
    })
})

// Tworzę nowy produkt => /api/v1/product/new
exports.newProduct = catchAsynchErrors(async (req, res, next) => {
    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.uploader.upload(images[i], {
            folder: 'products'
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.images = imagesLinks


    req.body.user = req.user.id;

    const product = await Product.create(req.body)

    res.status(201).json({
        success: true,
        product
    })
})