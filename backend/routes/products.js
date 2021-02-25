const express=require('express')
const router =express.Router()

const { getProducts } = require('../controllers/productControllers')

router.get('/products', getProducts)

module.exports = router