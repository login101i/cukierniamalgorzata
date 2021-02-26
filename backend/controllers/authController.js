const User = require('../models/user');

const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');




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

// Forgot Password   =>  /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler('Użytkownik nie został znaleziony pod tym adresem email', 404));
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // Create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;


    const message = `Twoje hasło resetujące token jest następujące:\n\n${resetUrl}\n\nJeśli nie chciałeś resetowego email, zignoruj tę wiadomość.`

    try {
        // try also node.js botcamp from Ghulam Abbas whter he send email using gmail
        await sendEmail({
            email: user.email,
            subject: 'Cukiernia Małgorzata - prośba o reset Hasła',
            message
        })
        res.status(200).json({
            success: true,
            message: `Email został wysłany do: ${user.email}`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500))
    }
})


// Reset Password   =>  /api/v1/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

    // Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHandler('Hasło resetujące jest nieprawidłowe lub token wygasł', 400)) }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Hasło nie pasuje koleżko.', 400))
    }
    // Setup new password
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user, 200, res)

})
