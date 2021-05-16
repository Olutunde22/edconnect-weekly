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
		req.flash('error', 'You need to be logged in to create a project');
		res.redirect('/login');
	}
});

router.post('/projects/submit', async (req, res) => {
	try {
		if (req.session.user) {
			let user = req.session.user;
			const createdBy = req.session.user._id;
			const name = req.body.name;
			const abstract = req.body.abstract;
			const authors = req.body.authors.split(',');
			const tags = req.body.tags.split(',');

			await project.create({ name, abstract, authors, tags, createdBy }).then(Project => {
				if (Project[0] === true) {
					req.session.user = user;
					res.redirect('/');
				} else {
					req.flash('error', Project[1]);
					res.redirect('/projects/submit');
				}
			});
		} else {
			req.flash('error', 'You need to be logged in to create a project');
			res.redirect('/login');
		}
	} catch (error) {
		res.redirect('/login');
	}
});

router.get('/project/:id', async (req, res) => {
	try {
		const user = req.session.user;
		const id = req.params.id;
		let collectionNames = [];
		let error = req.flash('error');
		let success = req.flash('success');
		let saved = false;
		let colID = '';
		if (req.session.user) {
			const createdBy = req.session.user._id;
			collectionNames = await collection.getCollection({ createdBy });
			for (var i = 0; i < collectionNames.length; i++) {
				if (collectionNames[i].projects.includes(id)) {
					saved = true;
					colID = collectionNames[i]._id;
				}
			}
		}
		await project.getById(id).then(Project => {
			const User = Project.createdBy;
			res.render('Project', { Project, User, user, saved, collectionNames, colID, error, success });
		});
	} catch (error) {
		req.flash('error', `${error}`);
		res.redirect('/login');
	}
});

router.post('/project/save', async (req, res) => {
	try {
		let user = req.session.user;
		if (user) {
			const name = req.body.name;
			const projectID = req.body.projectID;
			await collection.saveToCollection({ projectID, name }).then(saved => {
				if (saved) {
					req.session.user = user;
					req.flash('success', 'Saved to collection');
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

router.post('/project/unsave', async (req, res) => {
	try {
		let user = req.session.user;
		if (user) {
			const user = req.session.user;
			const projectID = req.body.projectID;
			const id = req.body.colID;
			await collection.deleteProject({ projectID, id }).then(result => {
				if (result == true) {
					req.session.user = user;
					req.flash('success', `Project removed from collection`);
					res.redirect(`/project/${projectID}`);
				} else {
					req.session.user = user;
					req.error('error', 'Something went wrong in changing status, please try again later');
					res.redirect(`/project/${projectID}`);
				}
			});
		} else {
			res.redirect('/login');
		}
	} catch (error) {
		req.flash('error', `${error}`);
		res.redirect('/login');
	}
});
module.exports = router;
