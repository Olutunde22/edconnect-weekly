/**
 * TO create the collection model
 */


const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CollectionSchema = new Schema(
	{
		name: { type: String, required: true },
		visibility: {
			type: String,
			enum: ['Private', 'Public'],
			default: 'Private',
			required: true
		},
		projects: [{ type: Schema.Types.ObjectId, ref: 'Projects' }],
		createdBy: { type: Schema.Types.ObjectId, ref: 'Users', required: true }
	},
	{ timestamps: true }
);

const Collections = mongoose.model('Collections', CollectionSchema);

module.exports = Collections;
