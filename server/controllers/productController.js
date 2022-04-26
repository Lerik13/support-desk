const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Product = require('../models/productModel')
const Ticket = require('../models/ticketModel')

// @desc Get products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find().sort({name: 'asc'})
	res.status(200).json(products)
})

// @desc Get product
// @route GET /api/products/:productId
// @access Public
const getProduct = asyncHandler(async (req, res) => {

	const product = await Product.findById(req.params.id)

	if (!product) {
		res.status(404)
		throw new Error('Product not found')
	}

	res.status(200).json(product)
})

// @desc Get product of ticket
// @route GET /api/products/by-ticket/:ticketId
// @access Public
const getProductOfTicket = asyncHandler(async (req, res) => {

	const ticket = await Ticket.findById(req.params.id)
	if (!ticket) {
		res.status(404)
		throw new Error('Ticket not found')
	}
	//const productId = ticket.product
	const product = await Product.findById(ticket.product)


	if (!product) {
		res.status(404)
		throw new Error('Product not found')
	}

	res.status(200).json(product)
})

// @desc Create product
// @route POST /api/products/
// @access Private
const addProduct = asyncHandler(async (req, res) => {
	
	const {name} = req.body

	if (!name) {
		res.status(400)
		throw new Error('Please add text')
	}

	// get user using Id in the JWT
	const user = await User.findById(req.user.id)

	if (!user) {
		res.status(401)
		throw new Error('User not found')
	}	
	if (!user.isAdmin) {
		res.status(401)
		throw new Error('Only admin is allowed to add new product')
	}

	const product = await Product.find({name})
	if (product && (product.length > 0)) {
		res.status(401)
		throw new Error('Product with this name already exists')
	}

	const newProduct = await Product.create({
		name
	})
	res.status(200).json(newProduct)
})

// @desc Delete product
// @route DELETE /api/products/:productId
// @access Private
const deleteProduct = asyncHandler(async (req, res) => {
	// get user using Id in the JWT
	const user = await User.findById(req.user.id)

	if (!user) {
		res.status(401)
		throw new Error('User not found')
	}
	if (!user.isAdmin) {
		res.status(401)
		throw new Error('Only admin is allowed to delete product')
	}

	const product = await Product.findById(req.params.id)

	if (!product) {
		res.status(404)
		throw new Error('Product not found')
	}

	await product.remove()

	res.status(200).json({success: true, _id: req.params.id})
})

// @desc Update product
// @route PUT /api/products/:productId
// @access Private
const updateProduct = asyncHandler(async (req, res) => {
	const {name} = req.body

	if (!name) {
		res.status(400)
		throw new Error('Please add text')
	}

	// get user using Id in the JWT
	const user = await User.findById(req.user.id)

	if (!user) {
		res.status(401)
		throw new Error('User not found')
	}
	if (!user.isAdmin) {
		res.status(401)
		throw new Error('Only admin is allowed to update product')
	}

	const product = await Product.findById(req.params.id)

	if (!product) {
		res.status(404)
		throw new Error('Product not found')
	}

	const checkProduct = await Product.find({name})
	if (checkProduct && (checkProduct.length > 0)) {
		res.status(401)
		throw new Error('Product with this name already exists')
	}
	
	const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true})

	res.status(200).json(updatedProduct)
})

module.exports = {
	getProducts,
	addProduct,
	deleteProduct,
	updateProduct,
	getProduct,
	getProductOfTicket
}