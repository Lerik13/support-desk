const express = require('express')
const router = express.Router({ mergeParams: true })
const { getNotes, addNote, getNote, updateNote, deleteNote } = require('../controllers/noteController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getNotes).post(protect, addNote)
router.route('/:id').get(protect, getNote).put(protect, updateNote).delete(protect, deleteNote)

module.exports = router