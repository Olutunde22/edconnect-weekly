const express = require('express');

const router = express.Router();

const project = require('../services/project');

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

router.post('/projects/submit', async (req, res) => {
	try {
		const createdBy = req.session.user._id;
		const name = req.body.name;
		const abstract = req.body.abstract;
		const authors = req.body.authors.split(',');
		const tags = req.body.tags.split(',');

		const Project = await project
			.create({ name, abstract, authors, tags, createdBy })
			.then((Project) => {
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
	const id = req.params.id;
	const Project = project.getById(id).then((Project) => {
			const User = Project.createdBy
			res.render('Project', { Project, User });

	});
});
module.exports = router;
