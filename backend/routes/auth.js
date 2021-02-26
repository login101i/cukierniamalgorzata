const express=require('express')
const router =express.Router()

const {registerUser, loginUser} = require('../controllers/authController')

const { isAuthenticatedUser } = require('../middlewares/auth')

router.post('/register', registerUser)
router.post('/login', loginUser)



module.exports = router