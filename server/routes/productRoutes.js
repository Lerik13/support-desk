const express = require('express')
const router = express.Router()
const { getProducts, addProduct, deleteProduct, updateProduct, getProduct, getProductOfTicket } = require('../controllers/productController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(getProducts).post(protect, addProduct)
router.route('/:id').get(getProduct).put(protect, updateProduct).delete(protect, deleteProduct)
router.route('/by-ticket/:id').get(getProductOfTicket)

module.exports = router