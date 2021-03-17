const Project = require('../models/project');
const helper = require('../models/mongo_helper');

/* Create new project */
const create = async ({ name, abstract, authors, tags, createdBy }) => {
	try {
		const project = new Project({name, abstract, authors, tags, createdBy});
		const saved = await project.save();
		if (saved) {
			return [true, project];
		}
	} catch (error) {
		return [false, helper.translateError(error)];
	}
};

/* Return project with specified id */
const getById = async (id) => {
	const project = await Project.findById(id).populate('createdBy');
	return project;
};

/* Return all Projects */
const getAll = () => {
	return Project.find();
};

module.exports = {
	getAll,
	create,
	getById,
};
