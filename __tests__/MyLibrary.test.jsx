/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '@testing-library/react';
import MyLibrary from '../views/MyLibrary';
import faker from 'faker';

describe('Renders MyLibrary Component', () => {
	const error = '';
	const success = '';
	const fakeUser = {
		_id: 1,
		firstName: faker.name.firstName(),
		lastName: faker.name.lastName(),
		email: faker.internet.email(),
		password: '123456789',
		matricNumber: '17/8808',
		program: 'Computer Science',
		graduationYear: '2021',
	};

	const fakeProjects = new Array(5).fill(0).map(() => {
		return {
			_id: Math.random(),

			name: faker.lorem.words(),

			abstract: faker.lorem.sentences,

			authors: [faker.name.firstName(), faker.name.firstName()],

			tags: { type: [String] },

			createdBy: fakeUser._id,
		};
	});

	const fakeCollection = {
		name: faker.lorem.words(),
		visibility: 'Private',
		projects: fakeProjects,
		createdBy: fakeUser._id,
	};

	test('Renders a collection with 5 projects', () => {
		render(
			<MyLibrary
				collection={fakeCollection}
				User={fakeUser}
				error={error}
				success={success}
				createdBy={1}
			/>
		);
		let table = document.getElementById('tableID')
		let row = table.rows;
		let rowLength = row.length;
		expect(rowLength).toBe(6);
		
	});
});
