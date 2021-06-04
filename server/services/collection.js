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
const getById = async (id) => {
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

/*Change visibility of project from private to public and vice versa */
const changevisibility = async ({ visibility, id }) => {
	const collection = await Collection.findById({ _id: id });
	if (visibility === 'Private') {
		collection.visibility = 'Public';
	} else if (visibility === 'Public') {
		collection.visibility = 'Private';
	}
	const saved = await collection.save();
	if (saved) {
		return [true, collection];
	}
	return false;
};

/*Deletes a project in a collection */
const deleteProject = async ({ projectID, id }) => {
	const collection = await Collection.findById({ _id: id });
	collection.projects.pull(projectID);
	const saved = await collection.save();
	if (saved) {
		return true;
	}
	return false;
};

/*Deletes a collection */
const deleteCollection = async ({ id }) => {
	await Collection.deleteOne({ _id: id });
};

/*Adds a collection gotten from another user to your library*/
const addToLibrary = async ({ collection, createdBy, ownerName }) => {
	try {
		const newCollection = new Collection({
			name: `${collection.name} (Saved from ${ownerName}'s collection)`,
			createdBy: createdBy,
		});

		for (var i = 0; i < collection.projects.length; i++) {
			newCollection.projects.push(collection.projects[i]);
		}

		const saved = await newCollection.save();
		if (saved) {
			return [true, newCollection];
		}
	} catch (error) {
		return [false, helper.translateError(error)];
	}
};

/* Checks if a collection name already exists in a users library */
const getUserCollection = async ({ createdBy, name }) => {
	const collection = await Collection.find({ createdBy: createdBy, name: name });
	if (collection.length > 0) {
		return true;
	} else {
		return false;
	}
};

module.exports = {
	create,
	getById,
	getCollection,
	saveToCollection,
	getUserCollection,
	changevisibility,
	deleteProject,
	deleteCollection,
	addToLibrary,
};
