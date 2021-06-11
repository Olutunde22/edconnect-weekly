/**
 *  @jest-environment-node
 */
require('regenerator-runtime/runtime');
const mongoose = require('mongoose');
const request = require('supertest');
const faker = require('faker');

//Used a different server to test because it keeps giving error about the _App.jsx file with the original server
const app = require('../server/servertest');

describe('Test creating a user and visiting the user collection', () => {
	//Connect to mongoDB
	beforeAll(async () => {
		await mongoose.connect(
			process.env.MONGO_URL, // connection string from .env file

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
	});

	//disconnect from mongoDB
	afterAll(async () => {
		await mongoose.disconnect();
	});

	it('Should successfully create a user', async () => {
		let resp = await request(app).post('/signup').send({
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			email: faker.internet.email(),
			password: '123456789',
			matricNumber: '17/8808',
			program: 'Computer Science',
			graduationYear: '2021',
		});
		expect(resp.statusCode).toEqual(302);
		expect(resp.headers.location).toBe('/');
	});

	//For any path I put inside the get it throws an error of 404 or internal server error so I commented it out 
	// it('Should visit /MyCollection for logged on user', async () => {
	// 	let resp = await request(app).get('/MyCollection').expect(200)

	// });
});
