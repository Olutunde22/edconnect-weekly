const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('bufferCommands', false);

mongoose.connect(
	process.env.MONGODB_URI, // connection string from .env file

	{
		useNewUrlParser: true,

		useUnifiedTopology: true,

		useCreateIndex: true,
	},

	// callback that’s called when connection succeeds or fails.

	(err) => {
		if (err) {
			console.log('Error connecting to db: ', err);
		} else {
			console.log(`Connected to MongoDB`);
		}
	}
);
