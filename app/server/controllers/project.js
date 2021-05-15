const express = require('express');

const router = express.Router();

const project = require('../services/project');

const collection = require('../services/collection');

router.get('/projects/submit', (req, res) => {
	if (req.session.user) {
		const user = req.session.user;
		let error = req.flash('error');
		res.render('CreateProject', { error, user });
	} else {
		res.redirect('/login');
	}
});

router.post('/projects/submit', async (req, res) => {
	try {
		const createdBy = req.session.user._id;
		const name = req.body.name;
		const abstract = req.body.abstract;
		const authors = req.body.authors.split(',');
		const tags = req.body.tags.split(',');

		await project.create({ name, abstract, authors, tags, createdBy }).then(Project => {
			if (Project[0] === true) {
				req.session.user = Project[1];
				res.redirect('/');
			} else {
				req.flash('error', Project[1]);
				res.redirect('/projects/submit');
			}
		});
	} catch (error) {
		res.redirect('/login');
	}
});

router.get('/project/:id', async (req, res) => {
	try {
		const user = req.session.user;
		const id = req.params.id;
		let collectionNames = [];
		if (req.session.user) {
			const createdBy = req.session.user._id;
			collectionNames = await collection.getCollection({ createdBy });
		}
		await project.getById(id).then(Project => {
			const User = Project.createdBy;
			res.render('Project', { Project, User, user, collectionNames });
		});
	} catch (error) {
		res.redirect('/');
	}
});

router.post('/project/createCollection', async (req, res) => {
	try {
		if (req.session.user) {
			const user = req.session.user;
			const createdBy = req.session.user._id;
			const name = req.body.name;
			const projectID = req.body.projectID;
			let Collection = [];

			Collection = await collection.getCollection({ createdBy });
			for (var i = 0; i < Collection.length; i++) {
				if (Collection[i].name === name) {
					return res.redirect(`/project/${projectID}`);
				}
			}

			await collection.create({ name, createdBy, projectID }).then(Collection => {
				if (Collection[0] === true) {
					req.session.user = user;
					res.redirect(`/project/${projectID}`);
				} else {
					req.flash('error', Project[1]);
					res.redirect(`/project/${projectID}`);
				}
			});
		} else {
			req.flash('error', 'You must be logged in to create a collection');
			res.redirect('/login');
		}
	} catch (error) {
		console.log(error);
	}
});

router.post('/project/save', async (req, res) => {
	try {
		if (req.session.user) {
			const name = req.body.name;
			const projectID = req.body.projectID;
			await collection.saveToCollection({ projectID, name }).then(saved => {
				if (saved) {
					res.redirect(`/project/${projectID}`);
				}
			});
		} else {
			req.flash('error', 'You must be logged in to save to a collection');
			res.redirect('/login');
		}
	} catch (error) {
		res.redirect('/login');
	}
});
module.exports = router;
