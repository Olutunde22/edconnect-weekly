const express = require('express');

const router = express.Router();

const projects = require('../services/project');

//For getting home page
router.get('/', async (req, res) => {
	const user = req.session.user;
	const project = await projects.getAll().then((project) => {
		res.render('Home', { project, user });
	});
});

//To logout a user
router.get('/logout', (req, res) => {
	req.session.destroy(() => {
		res.redirect('/');
	});
});

module.exports = router;
