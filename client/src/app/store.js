import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import ticketReducer from '../features/tickets/ticketSlice'
import noteReducer from '../features/notes/noteSlice'
import productReducer from '../features/products/productSlice'

export const store = configureStore({
	reducer: {
		auth: authReducer,
		tickets: ticketReducer,
		notes: noteReducer,
		products: productReducer
	},
});
