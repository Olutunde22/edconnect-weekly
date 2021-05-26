/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '@testing-library/react';
import Header from '../views/shared/Header';
import faker from 'faker';
import Home from '../views/Home';

it(' Renders Header without a user ', () => {
	render(<Header />);
	const header = document.getElementById('username');
	expect(header).toBeNull();
});

it(' Renders Header with a user ', () => {
	render(<Header firstname="Olutunde" />);
	const header = document.getElementById('username');
	expect(header.textContent).toBe('Hi, Olutunde');
});

describe('Renders Home Component', () => {
	const fakeProjects = new Array(10).fill(0).map(() => {
		return {
			_id: faker.random.alphaNumeric(6),
			name: faker.lorem.words(),
			abstract: faker.lorem.sentence(),
			authors: [faker.name.firstName(), faker.name.firstName()],
			tags: [faker.lorem.words(), faker.lorem.words()],
		};
	});

	test('Renders 8 projects', () => {
		render(<Home project={fakeProjects} />);
		const items = document.getElementsByClassName('projects')
		expect(items.length).toBe(8);
	});
});
