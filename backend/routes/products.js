const express=require('express')
const router =express.Router()

const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct} = require('../controllers/productControllers')

const { isAuthenticatedUser } = require('../middlewares/auth')


router.get('/products', isAuthenticatedUser, getProducts)
router.post('/admin/product/new', newProduct)
router.get('/product/:id', getSingleProduct)
router.put('/admin/product/:id',  updateProduct)
router.delete('/admin/product/:id', deleteProduct)


module.exports = router