const express = require('express');

const router = express.Router();

const getPrograms = require('../services/school').getPrograms();
const getGradYears = require('../services/school').getGradYears();
const user = require('../services/user');

router.get('/login', (req, res) => {
	const user = req.session.user;
	let error = req.flash('error');
	res.render('login', { error, user });
});

router.post('/login', (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	const User = user.authenticate(email, password);
	if (User[0] === true) {
		req.session.user = User[1];
		res.redirect('/');
	} else {
		req.flash('error', User[1]);
		res.redirect('/login');
	}
});

router.get('/signup', (req, res) => {
	const user = req.session.user;
	let error = req.flash('error');
	res.render('Signup', { getPrograms, getGradYears, error, user });
});

router.post('/signup', (req, res) => {
	const firstname = req.body.firstName;
	const lastname = req.body.lastName;
	const email = req.body.email;
	const password = req.body.password;
	const program = req.body.program;
	const matricNumber = req.body.matricNumber;
	const graduationYear = req.body.graduationYear;

	const User = user.create({
		firstname,
		lastname,
		email,
		password,
		matricNumber,
		program,
		graduationYear,
	});
	if (User[0] === true) {
		req.session.user = User[1];
		res.redirect('/');
	} else {
		req.flash('error', User[1]);
		res.redirect('/signup');
	}
});

module.exports = router;
