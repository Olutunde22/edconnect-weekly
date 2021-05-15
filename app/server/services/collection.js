const Collection = require('../models/collection');
const helper = require('../models/mongo_helper');

/* Create new project */
const create = async ({ name, createdBy, projectID }) => {
	try {
		const collection = new Collection({ name, createdBy, projectID });
		if (typeof projectID !== 'undefined') {
			collection.projects.push(projectID);
			const saved = await collection.save();
			if (saved) {
				return [true, collection];
			}
		}
	} catch (error) {
		return [false, helper.translateError(error)];
	}
};

/* Return collection with specified id */
const getById = async id => {
	const collection = await Collection.findById(id).populate('projects');
	return collection;
};

/* Return collections for specific user */
const getCollection = async ({ createdBy }) => {
	const collection = await Collection.find({ createdBy: createdBy });
	return collection;
};

/* Save project to a particular collection */
const saveToCollection = async ({ projectID, name }) => {
	const collection = await Collection.find({ name: name });
	collection.projects.push(projectID);
	const saved = await collection.save();
	if (saved) {
		return true;
	}
	return false;
};

module.exports = {
	create,
	getById,
	getCollection,
	saveToCollection
};
