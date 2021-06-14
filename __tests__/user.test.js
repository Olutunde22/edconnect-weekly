/**
 *  @jest-environment-node
 */
require('regenerator-runtime/runtime');
const mongoose = require('mongoose');
const supertest = require('supertest');
const faker = require('faker');
const collectionModel = require('../server/models/collection');
const app = require('../server/servertest');
const request = supertest(app);

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

	it('Should not allow a user who is not logged in to create a collection', async () => {
		const response = await request.post('/createCollection').send({
			name: faker.lorem.words(),
			projects: [],
			createdBy: 12345,
		});
		expect(response.status).toBe(302);
		expect(response.header.location).toBe('/login');
	});
	it('Should not allow a user who is not logged in to acces /MyCollection route', async () => {
		const response = await request.get('/MyCollection');
		expect(response.status).toBe(302);
		expect(response.header.location).toBe('/login');
	});
});
