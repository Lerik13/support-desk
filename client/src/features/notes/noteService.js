import axios from 'axios';

const API_URL = '/api/tickets/'

// Get ticket notes
const getNotes = async (ticketId, token) => {
	const config= {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}

	const response = await axios.get(API_URL + ticketId + '/notes', config)
	return response.data
}

// Get ticket note
const getNote = async (ticketId, noteId, token) => {
	const config= {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}

	const response = await axios.get(API_URL + ticketId +'/notes/'+ noteId, config)
	return response.data
}

// Create ticket note
const createNote = async (noteText, ticketId, token) => {
	const config= {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}

	const response = await axios.post(
		API_URL + ticketId + '/notes', 
		{ text: noteText }, 
		config
	)
	return response.data
}

// Edit ticket note
const editNote = async (noteText, ticketId, noteId, token) => {
	const config= {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}

	const response = await axios.put(
		API_URL + ticketId + '/notes/' + noteId, 
		{ text: noteText }, 
		config
	)
	return response.data
}


// Delete note
const deleteNote = async (ticketId, noteId, token) => {
	const config= {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}

	const response = await axios.delete(API_URL + ticketId + '/notes/' + noteId , config)

	return response.data
}

const noteService ={
	getNotes,
	getNote,
	createNote,
	editNote,
	deleteNote
}

export default noteService