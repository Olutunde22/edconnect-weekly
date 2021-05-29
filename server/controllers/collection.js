const express = require('express');

const router = express.Router();

const collections = require('../services/collection');

const user = require('../services/user');

//For getting collections that belong to a specific user
router.get('/MyCollection', async (req, res) => {
	try {
		if (req.session.user) {
			const User = req.session.user;
			let collection = [];
			const createdBy = req.session.user._id;
			let error = req.flash('error');
			let success = req.flash('success');
			collection = await collections.getCollection({ createdBy });
			let name = await user.getById(createdBy);
			name = name.firstname;
			res.render('MyCollection', { collection, User, name, error, success });
		} else {
			req.flash('error', 'You need to be logged in to have a collection');
			res.redirect('/login');
		}
	} catch (error) {
		req.flash('error', 'An error occured while fetching your collection');
		res.redirect('/login');
	}
});

// For creating collections using different routes
// I used different routes cause a user can create a collection from different places on the website
router.post(
	['/MyLibrary/createCollection', '/createCollection', '/project/createCollection'],
	async (req, res) => {
		try {
			if (req.session.user) {
				const user = req.session.user;
				const createdBy = req.session.user._id;
				const name = req.body.name;
				const projectID = req.body.projectID;
				let Collection = [];

				Collection = await collections.getCollection({ createdBy });
				for (var i = 0; i < Collection.length; i++) {
					if (Collection[i].name === name) {
						req.flash('error', 'This collection name exists in your collection');
						return res.redirect(`/MyCollection`);
					}
				}

				await collections.create({ name, createdBy, projectID }).then((Collection) => {
					if (Collection[0] === true) {
						req.session.user = user;
						req.flash('success', 'Collection created successfully');
						res.redirect(`/MyLibrary/${Collection[1]._id}`);
					} else {
						req.flash('error', Collection[1]);
						res.redirect(`/MyCollection`);
					}
				});
			} else {
				req.flash('error', 'You must be logged in to create a collection');
				res.redirect('/login');
			}
		} catch (error) {
			console.log(error);
		}
	}
);

//For getting a specific library
router.get('/MyLibrary/:id', async (req, res) => {
	try {
		const id = req.params.id;
		let error = req.flash('error');
		let success = req.flash('success');
		let Collection = [];
		let User = req.session.user || '';
		let createdBy = '';
		let collection = await collections.getById(id);
		createdBy = collection.createdBy;
		Collection = await collections.getCollection({ createdBy });
		if (collection.status == 'Private') {
			if (User) {
				if (JSON.stringify(User._id) === JSON.stringify(createdBy)) {
					res.render('MyLibrary', { collection, User, createdBy, error, success, Collection });
				} else {
					req.flash('error', 'You don’t have access to this collection');
					res.redirect('/MyCollection');
				}
			} else {
				req.flash('error', 'You don’t have access to this collection');
				res.redirect('/login');
			}
		} else if (collection.status == 'Public') {
			res.render('MyLibrary', { collection, User, createdBy, error, success, Collection });
		}
	} catch (error) {
		req.flash('error', 'An error occured while fetching your collection');
		res.redirect('/login');
	}
});

//For changing the status of a library from public to private and vice versa
router.post('/MyLibrary/status', async (req, res) => {
	try {
		if (req.session.user) {
			const status = req.body.status;
			const id = req.body.collectionID;
			await collections.changeStatus({ status, id }).then((result) => {
				if (result[0] == true) {
					req.flash('success', `Collection is now ${result[1].status}`);
					res.redirect(`/Mylibrary/${id}`);
				} else {
					req.error('error', 'Something went wrong in changing status, please try again later');
					res.redirect(`/Mylibrary/${id}`);
				}
			});
		}
	} catch (error) {
		req.flash('error', `${error}`);
		res.redirect('/login');
	}
});

//For deleting a library
router.post('/MyLibrary/delete', async (req, res) => {
	try {
		if (req.session.user) {
			const id = req.body.collectionID;
			const projectID = req.body.projectID;
			await collections.deleteProject({ projectID, id }).then((result) => {
				if (result == true) {
					req.flash('success', `Project removed from collection`);
					res.redirect(`/Mylibrary/${id}`);
				} else {
					req.error('error', 'Something went wrong in changing status, please try again later');
					res.redirect(`/Mylibrary/${id}`);
				}
			});
		}
	} catch (error) {
		req.flash('error', `${error}`);
		res.redirect('/login');
	}
});

//For deleting a collection in a library
router.post('/MyLibrary/deleteCollection', async (req, res) => {
	try {
		if (req.session.user) {
			const id = req.body.collectionID;
			await collections.deleteCollection({ id }).then(() => {
				req.flash('success', 'Collection deleted');
				res.redirect('/MyCollection');
			});
		}
	} catch (error) {
		req.flash('error', `${error}`);
		res.redirect('/login');
	}
});

//For adding a collection gotten from a friend to your library
router.post('/MyLibrary/addToLibrary', async (req, res) => {
	try {
		if (req.session.user) {
			const User = req.session.user;
			const createdBy = req.session.user._id;
			const id = req.body.collectionID;
			let collection = await collections.getById(id);
			let username = await user.getById(collection.createdBy);
			let ownerName = username.firstname;
		
			await collections.addToLibrary({ collection, createdBy, ownerName }).then((Collection) => {
				if (Collection[0]) {
					req.session.user = User;
					req.flash('success', 'Collection copied successfully');
					res.redirect(`/MyLibrary/${Collection[1]._id}`);
				} else {
					req.flash('error', collection[1]);
					res.redirect('/MyCollection');
				}
			});
		}
	} catch (error) {
		req.flash('error', `${error}`);
		res.redirect('/login');
	}
});

module.exports = router;