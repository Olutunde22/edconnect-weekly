const express = require('express');

const router = express.Router();

const collections = require('../services/collection');

const user = require('../services/user');

router.get('/MyCollection', async (req, res) => {
	try {
		if (req.session.user) {
			const User = req.session.user;
			let collection = [];
			const createdBy = req.session.user._id;
			let error = req.flash('error');
			let success = req.flash('success');
			collection = await collections.getCollection({ createdBy });
			let name = await user.getById(createdBy);
			name = name.firstname;
			res.render('MyCollection', { collection, User, name, error, success });
		} else {
			req.flash('error', 'You need to be logged in to have a collection');
			res.redirect('/login');
		}
	} catch (error) {
		req.flash('error', 'An error occured while fetching your collection');
		res.redirect('/login');
	}
});

router.post('/createCollection', async (req, res) => {
	try {
		if (req.session.user) {
			const user = req.session.user;
			const createdBy = req.session.user._id;
			const name = req.body.name;
			const projectID = req.body.projectID;
			let Collection = [];

			Collection = await collections.getCollection({ createdBy });
			for (var i = 0; i < Collection.length; i++) {
				if (Collection[i].name === name) {
					req.flash('error', 'This collection name exists in your collection');
					return res.redirect(`/MyCollection`);
				}
			}

			await collections.create({ name, createdBy, projectID }).then(Collection => {
				if (Collection[0] === true) {
					req.session.user = user;
					req.flash('success', 'Collection created successfully');
					res.redirect(`/MyCollection`);
				} else {
					req.flash('error', Collection[1]);
					res.redirect(`/MyCollection`);
				}
			});
		} else {
			req.flash('error', 'You must be logged in to create a collection');
			res.redirect('/login');
		}
	} catch (error) {
		console.log(error);
	}
});

router.get('/MyLibrary/:id', async (req, res) => {
	try {
		const id = req.params.id;
		let error = req.flash('error');
		let success = req.flash('success');
		let Collection = [];
		let User = req.session.user;
	
		if (req.session.user) {
			let collection = await collections.getById(id);
			const createdBy = collection.createdBy;
			Collection = await collections.getCollection({ createdBy });
			res.render('MyLibrary', { collection, User, createdBy, error, success, Collection });
		} else {
			req.flash('error', 'You need to be logged in to have a collection');
			res.redirect('/login');
		}
	} catch (error) {
		req.flash('error', 'An error occured while fetching your collection');
		res.redirect('/login');
	}
});

router.post('/MyLibrary/status' , async (req,res) =>{
	try{
		if(req.session.user){
			const status = req.body.status
			const id = req.body.collectionID
			await collections.changeStatus({status, id}).then((result)=>{
				if(result[0] == true){
					req.flash('success', `Status changed to ${result[1].status} successfully`)
					res.redirect(`/Mylibrary/${id}`)
				}else{
					req.error('error', 'Something went wrong in changing status, please try again later')
					res.redirect(`/Mylibrary/${id}`)
				}
			})
		}
	}catch(error){
		req.flash('error', error)
		res.redirect('/login')
	}
})

module.exports = router;
