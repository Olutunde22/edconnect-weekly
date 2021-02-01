const express = require('express');

const router = express.Router();

const getPrograms = require('../services/school').getPrograms();
const getGradYears = require('../services/school').getGradYears();
const user = require('../services/user');

router.get('/login', (req, res) => {
	const user = req.session.user
	let error = req.flash("error")
	res.render('login', {error,user})
});


router.post('/login', (req, res) => {
	const email = req.body.email
	const password = req.body.password
	const User = user.authenticate(email,password)
	if (User[0] === true){
		req.session.user = User[1];
		res.redirect('/')
	}else{
		req.flash("error", User[1])
		res.redirect('/login')
	}
});

router.get('/signup', (req, res) => {
	const user = req.session.user
	let error = req.flash("error")
	res.render('Signup', { getPrograms, getGradYears, error, user});
});

router.post('/signup', (req, res) => {
	const User = user.create(req.body)
	if (User[0] === true){
		req.session.user = User[1];
		res.redirect('/')
	}else{
		req.flash("error", User[1])
		res.redirect('/signup')
	}
});

module.exports = router;
