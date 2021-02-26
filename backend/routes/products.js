const express=require('express')
const router =express.Router()

const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct} = require('../controllers/productControllers')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')


router.get('/products',  isAuthenticatedUser, authorizeRoles('admin'), getProducts)
router.post('/admin/product/new', isAuthenticatedUser, authorizeRoles('admin'), newProduct)
router.get('/product/:id', getSingleProduct)
router.put('/admin/product/:id',  updateProduct)
router.delete('/admin/product/:id', deleteProduct)


module.exports = router