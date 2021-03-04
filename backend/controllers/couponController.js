const Coupon = require("../models/coupon");
const ErrorHandler = require('../middlewares/ErrorHandler2');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
// create, remove, list

exports.create = catchAsyncErrors(async (req, res, next) => {
    const { name, expiry, discount } = req.body.coupon;

    const coupon = await Coupon.create({
        name,
        expiry,
        discount
    })
    res.status(200).json({
        success: true,
        coupon
    })
})

exports.list=catchAsyncErrors(async (req, res, next) => {
    const coupons=await Coupon.find({})
    const couponsLength=coupons.length

    res.status(200).json({
        success: true,
        couponsLength,
        coupons,
    })
})

