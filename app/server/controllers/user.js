const express = require('express');

const router = express.Router();

const getPrograms = require('../services/school').getPrograms();
const getGradYears = require('../services/school').getGradYears();
const user = require('../services/user');

router.get('/login', (req, res) => {
	const user = req.session.user;
	let error = req.flash('error');
	res.render('Login', { error, user });
});

router.post('/login', async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	const User = await user
		.authenticate(email, password)
		.then((User) => {
			if (User[0] === true) {
				req.session.user = User[1];
				res.redirect('/');
			} else {
				req.flash('error', User[1]);
				res.redirect('/login');
			}
		})
		.catch((error) => {
			console.log(error);
		});
});

router.get('/signup', (req, res) => {
	const user = req.session.user;
	let error = req.flash('error');
	res.render('Signup', { getPrograms, getGradYears, error, user });
});

router.post('/signup', async (req, res) => {
	const firstname = req.body.firstName;
	const lastname = req.body.lastName;
	const email = req.body.email;
	const password = req.body.password;
	const program = req.body.program;
	const matricNumber = req.body.matricNumber;
	const graduationYear = req.body.graduationYear;

	const User = await user
		.create({
			firstname,
			lastname,
			email,
			password,
			matricNumber,
			program,
			graduationYear,
		})
		.then((User) => {
			if (User[0] === true) {
				req.session.user = User[1];
				res.redirect('/');
			} else {
				req.flash('error', User[1]);
				res.redirect('/signup');
			}
		})
		.catch((error) => {
			console.log(error);
		});
});

module.exports = router;
