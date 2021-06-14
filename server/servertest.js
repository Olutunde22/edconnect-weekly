require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const flash = require('express-flash');
/**
 * Test server used to run tests
 */
const app = express();

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.use(
	session({
		secret: 'secret',
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 7,
		},
		resave: true,
		saveUninitialized: false,
	})
);

app.use(flash());
app.use('/', require('./controllers/user'));
app.use('/', require('./controllers/home'));
app.use('/', require('./controllers/project'));
app.use('/', require('./controllers/collection'));
app.use(express.static('public'));

module.exports = app;
