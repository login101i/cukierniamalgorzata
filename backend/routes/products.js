const express=require('express')
const router =express.Router()

const { getProducts, newProduct } = require('../controllers/productControllers')

router.get('/products', getProducts)
router.post('/admin/product/new', newProduct)

module.exports = router