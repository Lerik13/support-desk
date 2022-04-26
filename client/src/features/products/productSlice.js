import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import productService from './productService'

const initialState = {
	products: [],	
	product: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
}

// Creat new product
export const createProduct = createAsyncThunk('products/create', async (productData, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token
		return await productService.createProduct(productData, token)
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})

// Get products
export const getProducts = createAsyncThunk('products/getAll', async (_, thunkAPI) => {
	try {
		return await productService.getProducts()
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})

// Get product
export const getProduct = createAsyncThunk('products/getProduct', async (productId, thunkAPI) => {
	try {
		return await productService.getProduct(productId)
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})

// Get product of ticket
export const getProductOfTicket = createAsyncThunk('products/getProductOfTicket', async (ticketId, thunkAPI) => {
	try {
		return await productService.getProductOfTicket(ticketId)
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})

export const productSlice= createSlice({
	name: 'product',
	initialState,
	reducers: {
		reset: (state) => initialState
	},
	extraReducers: (builder) => {
		builder
			.addCase(createProduct.pending, (state) => {
				state.isLoading = true
			})
			.addCase(createProduct.fulfilled, (state) => {
				state.isLoading = false
				state.isSuccess = true
			})
			.addCase(createProduct.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(getProducts.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getProducts.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.products = action.payload
			})
			.addCase(getProducts.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(getProduct.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getProduct.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.product = action.payload
			})
			.addCase(getProduct.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(getProductOfTicket.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getProductOfTicket.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.product = action.payload
			})
			.addCase(getProductOfTicket.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
	}
})

export const {reset} = productSlice.actions
export default productSlice.reducer