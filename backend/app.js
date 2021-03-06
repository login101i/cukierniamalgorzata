const express = require('express')

const app = express()
const errrorMiddleware = require('./middlewares/errors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const dotenv = require('dotenv')
const path = require('path')

if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })

dotenv.config({ path: 'backend/config/config.env' })


// importuję routy
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
const products = require('./routes/products')
const auth = require('./routes/auth')
const order = require('./routes/order')
const coupon = require('./routes/coupon')
const payment = require('./routes/payment')




app.use('/api/v1', products)
app.use('/api/v1', auth)
app.use('/api/v1', order)
app.use('/api/v1', coupon)
app.use('/api/v1', payment)

if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}


app.use(errrorMiddleware)

module.exports = app