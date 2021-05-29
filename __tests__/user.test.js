/**
 *  @jest-environment-node
 */
require('regenerator-runtime/runtime');
const mongoose = require('mongoose');
const request = require('supertest');
const faker = require('faker');

//Used a different server to test because it keeps giving error about the _App.jsx file with the original server
const app = require('../server/servertest');

describe(' Signup a user', () => {
	//Connect to mongoDB
	beforeAll(async () => {
		await mongoose.connect(
			process.env.MONGO_URL, // connection string from .env file

			{
				useNewUrlParser: true,

				useUnifiedTopology: true,

				useCreateIndex: true,
			}
		);
	});

	//disconnect from mongoDB
	afterAll(async () => {
		await mongoose.disconnect();
	});

	it('Should successfully create a user', async () => {
		const resp = await request(app).post('/signup').send({
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			email: faker.internet.email(),
			password: '123456789',
			matricNumber: '17/8909',
			program: 'Computer Science',
			graduationYear: '2021',
		});
		expect(resp.statusCode).toEqual(302);
		expect(resp.headers.location).toBe('/');
	});

    it('Should not create a user', async () => {
		const resp = await request(app).post('/signup').send({
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			email: faker.internet.email(),
			password: '12345',
			matricNumber: '17/8909',
			program: 'Computer Science',
			graduationYear: '2021',
		});
		expect(resp.statusCode).toEqual(302);
		expect(resp.headers.location).toBe('/signup');
	});
});
