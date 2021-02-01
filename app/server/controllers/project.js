const express = require('express');

const router = express.Router();

const project = require('../services/project');

const user = require('../services/user')

router.get('/submit', (req, res) => {
	if (req.session.user) {
		const user = req.session.user;
		let error = req.flash('error');
		res.render('CreateProject', { error, user });
	} else {
		res.redirect('/login');
	}
});

router.post('/submit', (req, res) => {
	const createdBy = req.session.user.id;
	const name = req.body.name;
	const abstract = req.body.abstract;
	const authors = req.body.authors.split(',');
	const tags = req.body.tags.split(',');

	const Project = project.create({ name, abstract, authors, tags, createdBy });

	if (Project[0] === true) {
		req.session.user = Project[1];
		res.redirect('/');
	} else {
		req.flash('error', Project[1]);
		res.redirect('/project/submit');
	}
});

router.get('/:id', (req,res) =>{
    const id = req.params.id
    const Project = project.getById(id)
    const User = user.getById(Project.createdBy)
    res.render('Project', { Project, User });
})
module.exports = router;
