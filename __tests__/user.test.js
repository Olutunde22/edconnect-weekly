// /**
//  *  @jest-environment-node
//  */
// require('regenerator-runtime/runtime');
// const mongoose = require('mongoose');
// const request = require('supertest');
// const faker = require('faker');

// //Used a different server to test because it keeps giving error about the _App.jsx file with the original server
// const app = require('../server/servertest');

// describe('Test creating a collection and adding to collection ', () => {
// 	//Connect to mongoDB
// 	beforeAll(async () => {
// 		await mongoose.connect(
// 			process.env.MONGO_URL, // connection string from .env file

// 			{
// 				useNewUrlParser: true,

// 				useUnifiedTopology: true,

// 				useCreateIndex: true,
// 			},
// 			// callback that’s called when connection succeeds or fails.

// 			(err) => {
// 				if (err) {
// 					console.log('Error connecting to db: ', err);
// 				} else {
// 					console.log(`Connected to MongoDB`);
// 				}
// 			}
// 		);
// 	});

// 	//disconnect from mongoDB
// 	afterAll(async () => {
// 		await mongoose.disconnect();
// 	});
 
// 	it('Should successfully create a user, create a project, add a project to a new collection ', async () => {
// 		const resp = await request(app).post('/signup').send({
// 			firstName: faker.name.firstName(),
// 			lastName: faker.name.lastName(),
// 			email: faker.internet.email(),
// 			password: '123456789',
// 			matricNumber: '17/8808',
// 			program: 'Computer Science',
// 			graduationYear: '2021',
// 		});
// 		expect(resp.statusCode).toEqual(302);
// 		expect(resp.headers.location).toBe('/');
// 	});

// 	it('Should create a project ', async () => {
// 		const resp = await request(app)
// 			.post('/createCollection')
// 			.send({
// 				name: faker.lorem.words(),
// 				abstract: faker.lorem.sentence(),
// 				authors: [faker.name.firstName(), faker.name.firstName()],
// 				tags: [faker.lorem.words(), faker.lorem.words()],
// 			});
// 		expect(resp.statusCode).toEqual(302);
// 		expect(resp.headers.location).toBe('/');
// 	});

// 	it('Should visit homepage and click on the newly created project and add to a collection ', async () => {
// 		const resp = await request(app).get('/');
// 		document.getElementsByTagName('a').click();
// 		const projectID = req.params.id;
// 		expect(resp.statusCode).toEqual(302);
// 		expect(resp.headers.location).toBe(`/project/${projectID}`);

// 		// const projectName = document.getElementById('project_name');
// 		// expect(projectName).toBe(project.name);

// 		const saveBtn = document.getElementsByClassName('click_btn');
// 		saveBtn.click();

// 		const createBtn = document.getElementsByClassName('create_btn');
// 		createBtn.click();

// 		const collectionName = document.getElementById('name');
// 		collectionName.value = 'Collection 1';

// 		const colBtn = document.getElementsByClassName('col_btn');
// 		colBtn.click();

// 		expect(resp.statusCode).toEqual(302);
// 		expect(resp.headers.location).toBe('/MyCollection');

// 		const message = document.getElementsByClassName('message');
// 		expect(message).toEqual('Collection created successfully');
// 	});
// });
