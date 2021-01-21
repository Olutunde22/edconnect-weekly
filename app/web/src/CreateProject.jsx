import React, { useState } from 'react';
import { Container, Form, FormControl, FormGroup, Button, Alert } from 'react-bootstrap';
import Layout from './shared/Layout';
import { useHistory, useRouteMatch } from 'react-router-dom';
import {getCookie} from './shared/cookie';

export default () => {
	const [name, setName] = useState('');
	const [abstract, setAbstract] = useState('');
	const [authors, setAuthors] = useState('');
	const [tags, setTags] = useState('');
	const [error, setError] = useState('');
	let history = useHistory();
	let match = useRouteMatch("/project/submit");

	if (match) {
		const uid = getCookie('uid');
		if (uid) {
			
		} else {
			history.push('/login')
		}
	}
	
	const handleInputChange = (event) => {
		const { name, value } = event.target;

		switch (name) {
			case 'name':
				setName(value);
				break;
			case 'abstract':
				setAbstract(value);
				break;
			case 'authors':
				setAuthors(value);
				break;
			case 'tags':
				setTags(value);
				break;
		}
	};

	const handleProject = (event) => {
		const uid =getCookie('uid')
		event.preventDefault();
		const data = {
			name: name,
			abstract: abstract,
			authors: authors.split(','),
			tags: tags.split(','),
		};

		return fetch('/api/projects', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.status == 'ok') {
					document.cookie = `uid=${uid}; path=/`;
					history.push('/');
				} else {
					setError(data.errors);
				}
			});
	};

	return (
		<Layout>
			<>
				<Container>
					<Form className="my-5 justify-content-center w-75 form-signin">
						<h1>Submit Project</h1>
						{error ? (
							<Alert variant="danger">
								{error.map((error) => (
									<p key={error}>{error}</p>
								))}
							</Alert>
						) : null}
						<FormGroup>
							<Form.Label>Project Name</Form.Label>
							<FormControl
								type="text"
								id="name"
								name="name"
								placeholder="Enter project name"
								value={name}
								onChange={handleInputChange}
							/>
						</FormGroup>
						<FormGroup>
							<Form.Label>Project Abstract:</Form.Label>
							<FormControl
								as="textarea"
								id="abstract"
								name="abstract"
								rows="5"
								value={abstract}
								onChange={handleInputChange}
							/>
						</FormGroup>
						<FormGroup>
							<Form.Label>Authors</Form.Label>
							<FormControl
								type="text"
								id="authors"
								name="authors"
								placeholder="Enter Authors name (Seperated by comma)"
								value={authors}
								onChange={handleInputChange}
							/>
						</FormGroup>
						<FormGroup>
							<Form.Label>Tags(s)</Form.Label>
							<FormControl
								type="text"
								id="tags"
								name="tags"
								placeholder="Use # to tag project with different topics (e.g #javascript, #mongodb)"
								value={tags}
								onChange={handleInputChange}
							/>
						</FormGroup>
						<Button type="submit" variant="primary" onClick={handleProject}>
							Continue
						</Button>
					</Form>
				</Container>
			</>
		</Layout>
	);

};
