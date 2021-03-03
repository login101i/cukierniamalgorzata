const express = require('express')
const router = express.Router();

const {
    processPayment,
    sendStripApi
} = require('../controllers/paymentController')

const { isAuthenticatedUser } = require('../middlewares/auth')

router.route('/payment/process').post(processPayment);
router.route('/stripeapi').get(sendStripApi);

module.exports = router;