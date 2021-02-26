const User = require('../models/user');

const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');


// Register a user   => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {



    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "result.public_id",
            url: "result.secure_url"
        }
    })


    sendToken(user, 200, res)



})

// Login User  =>  /a[i/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // Checks if email and password is entered by user
    if (!email || !password) {
        return next(new ErrorHandler('Wprowadź login i hasło.', 400))
    }

    // Finding user in database
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return next(new ErrorHandler('Niepoprawne hasło lub login.', 401));
    }

    // Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Niepoprawne hasło lub login.', 401));
    }

    const token = user.getJwtToken()
    sendToken(user, 200, res)
})


exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Wylogowano użytkownika'
    })
})

