import React, { useState, useEffect} from 'react';
import { Container, Form, FormControl, FormGroup, Button, Alert } from 'react-bootstrap';
import Layout from './shared/Layout';


const CreateProject = (props) => {

	const {user} = props
	const [name, setName] = useState('');
	const [abstract, setAbstract] = useState('');
	const [authors, setAuthors] = useState('');
	const [tags, setTags] = useState('');
	const [error, setError] = useState('');
	
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
	
	const errorData = () => {
		setError(props.error)
	};

	useEffect(() => {
		errorData();
	}, []);
	return (
		<Layout {...user}>
			<>
				<Container>
					<Form className="my-5 justify-content-center w-75 form-signin" id="createProjectForm" method="POST" action="/project/submit">
						<h1>Submit Project</h1>
						{error.length > 1 ? (
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
						<Button type="submit" variant="primary" >
							Continue
						</Button>
					</Form>
				</Container>
			</>
		</Layout>
	);
};

export default CreateProject;
