require('dotenv').config();

const mongoose = require('mongoose');
const register = require('@react-ssr/express/register');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('express-flash');
const app = express();

const store = new MongoDBStore({
	uri: process.env.MONGODB_URI,
	collection: 'mySessions'
});

register(app).then(() => {
	app.use((req, res, next) => {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		next();
	});

	app.use(morgan('combined'));
	app.use(bodyParser.json());
	app.use(
		bodyParser.urlencoded({
			extended: true
		})
	);

	app.use(
		session({
			secret: 'secret',
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 * 7
			},
			store: store,
			resave: true,
			saveUninitialized: false
		})
	);

	app.use(flash());
	app.use('/', require('./controllers/user'));
	app.use('/', require('./controllers/home'));
	app.use('/', require('./controllers/project'));
	app.use('/', require('./controllers/collection'));
	app.use(express.static('public'));

	console.log(process.env.PORT)
	app.listen(process.env.PORT || 5000, () =>
		console.log('Server listening')
	);

	mongoose.set('bufferCommands', false);

	mongoose.connect(
		process.env.MONGODB_URI, // connection string from .env file

		{
			useNewUrlParser: true,

			useUnifiedTopology: true,

			useCreateIndex: true
		},

		// callback that’s called when connection succeeds or fails.

		err => {
			if (err) {
				console.log('Error connecting to db: ', err);
			} else {
				console.log(`Connected to MongoDB`);
			}
		}
	);
});
