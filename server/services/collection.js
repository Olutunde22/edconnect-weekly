const Collection = require('../models/collection');
const helper = require('../models/mongo_helper');

/* Create new project */
const create = async ({ name, createdBy, projectID }) => {
	try {
		const collection = new Collection({ name, createdBy, projectID });
		if (typeof projectID !== 'undefined') {
			collection.projects.push(projectID);
		}
		const saved = await collection.save();
		if (saved) {
			return [true, collection];
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
	const collection = await Collection.findOne({ name: name });
	collection.projects.push(projectID);
	const saved = await collection.save();
	if (saved) {
		return true;
	}
	return false;
};

/*Change status of project from private to public and vice versa */
const changeStatus = async ({ status, id }) => {
	const collection = await Collection.findById({ _id: id });
	if (status === 'Private') {
		collection.status = 'Public';
	} else if (status === 'Public') {
		collection.status = 'Private';
	}
	const saved = await collection.save();
	if (saved) {
		return [true, collection];
	}
	return false;
};

const deleteProject = async ({ projectID, id }) => {
	const collection = await Collection.findById({ _id: id });
	collection.projects.pull(projectID);
	const saved = await collection.save();
	if (saved) {
		return true;
	}
	return false;
};

const deleteCollection = async ({ id }) => {
	await Collection.deleteOne({ _id: id });
};

module.exports = {
	create,
	getById,
	getCollection,
	saveToCollection,
	changeStatus,
	deleteProject,
	deleteCollection
};
