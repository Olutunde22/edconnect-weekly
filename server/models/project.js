const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
	{
		name: { type: String, required: true },

		abstract: { type: String, required: true },

		authors: { type: [String], required: true, unique: true },

		tags: { type: [String] },

		createdBy: { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
	},
	{ timestamps: true }
);

const Project = mongoose.model('Projects', ProjectSchema);

module.exports = Project;
