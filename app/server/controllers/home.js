const express = require('express');

const router = express.Router();

const projects = require('../services/project');

router.get('/', async (req, res) => {
	const user = req.session.user;
	const project = await projects.getAll().then((project) => {
		res.render('Home', { project, user });
	});
});

router.get('/logout', (req, res) => {
	req.session.destroy(() => {
		res.redirect('/');
	});
});

module.exports = router;
