const User = require('../models/user');

const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

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

    const token = user.getJwtToken()


   res.status(200).json({
       success:true,
       user,
       token
   })

})
