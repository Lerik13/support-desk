const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')
const Note = require('../models/noteModel')

// @desc Get notes for a ticket
// @route GET /api/tickets/:ticketId/notes
// @access Private

const getNotes = asyncHandler(async (req, res) => {
	// get user using Id in the JWT
	const user = await User.findById(req.user.id)

	if (!user) {
		res.status(401)
		throw new Error('User not found')
	}

	const ticket = await Ticket.findById(req.params.ticketId)

	if (ticket.user.toString() !== req.user.id) {
		res.status(401)
		throw new Error('User not authorized')
	}

	const notes = await Note.find({ticket: req.params.ticketId})

	res.status(200).json(notes)
})

// @desc Create ticket note
// @route POST /api/tickets/:ticketId/notes
// @access Private
const addNote = asyncHandler(async (req, res) => {
	const {text} = req.body

	if (!text) {
		res.status(400)
		throw new Error('Please add text')
	}

	// get user using Id in the JWT
	const user = await User.findById(req.user.id)

	if (!user) {
		res.status(401)
		throw new Error('User not found')
	}
	
	const note = await Note.create({
		text,
		isStaff: false,
		user: req.user.id,
		ticket: req.params.ticketId
	})

	res.status(200).json(note)
})

// @desc Delete note
// @route DELETE /api/tickets/:ticketId/notes
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
	// get user using Id in the JWT
	const user = await User.findById(req.user.id)

	if (!user) {
		res.status(401)
		throw new Error('User not found')
	}

	const note = await Note.findById(req.params.id)

	if (!note) {
		res.status(404)
		throw new Error('Note not found')
	}

	if (note.user.toString() !== req.user.id) {
		res.status(401)
		throw new Error('Not Authorized')
	}
	
	await note.remove()

	res.status(200).json({success: true})
})

// @desc Update user ticket note
// @route PUT /api/tickets/:ticketId/notes
// @access Private
const updateNote = asyncHandler(async (req, res) => {
	// get user using Id in the JWT
	const user = await User.findById(req.user.id)

	if (!user) {
		res.status(401)
		throw new Error('User not found')
	}

	const note = await Note.findById(req.params.id)

	if (!note) {
		res.status(404)
		throw new Error('Note not found')
	}

	if (note.user.toString() !== req.user.id) {
		res.status(401)
		throw new Error('Not Authorized')
	}
	
	const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body)

	res.status(200).json(updatedNote)
})

module.exports = {
	getNotes,
	addNote,
	deleteNote,
	updateNote
}