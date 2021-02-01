const express = require('express');

const router = express.Router();

const project = require('../services/project').getAll();

router.get('/', (req, res) => {
	const user = req.session.user;
	res.render('Home', { project, user });
});

router.get('/logout', (req, res) => {
	req.session.destroy(() => {
		res.redirect('/');
	});
});

module.exports = router;
