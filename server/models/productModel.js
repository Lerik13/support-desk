const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
	{
		name: {
			type: String,
			require: [true, 'Please add some text'],
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Product', productSchema)