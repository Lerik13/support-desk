import axios from 'axios';

const API_URL = '/api/products/'

// Get ticket notes
const getProducts = async (token) => {
	const config= {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}

	const response = await axios.get(API_URL, config)
	return response.data
}

// Get Product
const getProduct = async (productId) => {
	const response = await axios.get(API_URL + productId)
	return response.data
}

// Get Product of Ticket
const getProductOfTicket = async (ticketId) => {
	const response = await axios.get(API_URL +'/by-ticket/'+ ticketId)
	return response.data
}

// Create Product
const createProduct = async (productName, productId, token) => {
	const config= {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}

	const response = await axios.post(
		API_URL + productId, 
		{ name: productName }, 
		config
	)
	return response.data
}

// Edit Product
const editProduct = async (productName, productId, token) => {
	const config= {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}

	const response = await axios.put(
		API_URL + productId, 
		{ name: productName }, 
		config
	)
	return response.data
}


// Delete note
const deleteProduct = async (productId, token) => {
	const config= {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}

	const response = await axios.delete(API_URL + productId, config)

	return response.data
}

const productService ={
	getProducts,
	getProduct,
	createProduct,
	editProduct,
	deleteProduct,
	getProductOfTicket
}

export default productService