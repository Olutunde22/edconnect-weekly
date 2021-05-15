const express = require('express');

const router = express.Router();

const project = require('../services/project');

const collections = require('../services/collection');

const user = require('../services/user');

router.get('/projects/submit', (req, res) => {
	if (req.session.user) {
		const user = req.session.user;
		let error = req.flash('error');
		res.render('CreateProject', { error, user });
	} else {
		res.redirect('/login');
	}
});

// router.post('/createCollection', async (req, res) => {
// 	try {
// 		const user = req.session.user;
// 		const createdBy = req.session.user._id;
// 		const name = req.body.name;
// 		const projectID = req.body.projectID;

// 		await collections.create({ name, createdBy, projectID }).then(collections => {
// 			if (collections[0] === true) {
// 				req.session.user = user;
// 				res.redirect('/MyCollection');
// 			} else {
// 				req.flash(
// 					'error',
// 					'There was an error while trying to save your project, please try again'
// 				);
// 				res.redirect(`{/projects/${projectID}}`);
// 			}
// 		});
// 	} catch (error) {
// 		res.redirect('/login');
// 	}
// });

router.get('/MyLibrary/:id', async (req, res) => {
	const id = req.params.id;
	project.getById(id).then(Project => {
		const User = Project.createdBy;
		res.render('MyLibrary', { Project, User });
	});
});

router.get('/MyCollection', async (req, res) => {
	try {
		if (req.session.user) {
			const User = req.session.user;
			let collection = [];
			const createdBy = req.session.user._id;
			collection = await collections.getCollection({ createdBy });

			let name = await user.getById(createdBy);
			name = name.firstname;
			res.render('MyCollection', { collection, User, name });
		} else {
			req.flash('error', 'You need to be logged in to have a collection');
			res.redirect('/login');
		}
	} catch (error) {
		req.flash('error', 'An error occured while fetching your collection');
		res.redirect('/login');
	}
});

module.exports = router;
