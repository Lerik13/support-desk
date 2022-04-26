const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			require: true,
			ref: 'User'
		},
		product: {
			type: mongoose.Schema.Types.ObjectId,
			require: [true, 'Please select a product'],
			ref: 'Product'
		},
		description: {
			type: String,
			require: [true, 'Please enter a description of the issue'],
		},
		status: {
			type: String,
			required: true,
			enum: ['new', 'open', 'closed'],
			default: 'new'
		}
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Ticket', ticketSchema)