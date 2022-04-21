import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import noteService from './noteService'

const initialState = {
	notes: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
}

// Get ticket notes
export const getNotes = createAsyncThunk('notes/getAll', async (tickedId, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token
		return await noteService.getNotes(tickedId, token)
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})

// Get ticket note
export const getNote = createAsyncThunk('notes/get', async (ticketId, noteId, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token
		return await noteService.getNote(ticketId, noteId, token)
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})

// Create a ticket note
export const createNote = createAsyncThunk('notes/create', async ({noteText, ticketId}, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token
		return await noteService.createNote(noteText, ticketId, token)
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})

// Edit a ticket note
export const editNote = createAsyncThunk('note/edit', async ({noteText, ticketId, noteId}, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token
		return await noteService.editNote(noteText, ticketId, noteId, token)
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})

// Delete a ticket note
export const deleteNote = createAsyncThunk('note/delete', async ({ticketId, noteId}, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token
		return await noteService.deleteNote(ticketId, noteId, token)
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})


export const noteSlice = createSlice({
	name: 'note',
	initialState,
	reducers: {
		reset: (state) => initialState
	},
	extraReducers: (builder) => {
		builder
			.addCase(getNotes.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getNotes.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.notes = action.payload
			})
			.addCase(getNotes.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(createNote.pending, (state) => {
				state.isLoading = true
			})
			.addCase(createNote.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.notes.push(action.payload)
			})
			.addCase(createNote.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(editNote.pending, (state) => {
				state.isLoading = true
			})
			.addCase(editNote.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.notes.map((note) => (
					note._id === action.payload._id 
						? (note.text = action.payload.text)
						: note
				))
			})
			.addCase(editNote.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(deleteNote.pending, (state) => {
				state.isLoading = true
			})
			.addCase(deleteNote.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.notes = state.notes.filter(note => note._id !== action.payload._id)
			})
			.addCase(deleteNote.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
	}
})

export const {reset} = noteSlice.actions
export default noteSlice.reducer