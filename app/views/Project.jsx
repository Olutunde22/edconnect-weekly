import React, { useEffect, useState } from 'react';
import Layout from './shared/Layout';
import { Container, FormControl, FormGroup, Button, Row, Col, Card } from 'react-bootstrap';

const Project = (props) => {
	const { user } = props;
	const [projects, setProjects] = useState([]);
	const [name, setName] = useState('');
	const [authors, setAuthors] = useState([]);
	const [createdAt, setCreatedAt] = useState('');
	const [lastUpdated, setLastUpdated] = useState('');

	const project = () => {
		let created = new Date(props.Project.createdAt).toLocaleDateString();
		let updated = new Date(props.Project.updatedAt).toLocaleDateString();
		setProjects(props.Project);
		getUserName();
		setAuthors(props.Project.authors);
		setCreatedAt(created);
		setLastUpdated(updated);
	};

	const getUserName = () => {
		var name = `${props.User.firstname}  ${props.User.lastname}`;
		setName(name);
	};

	useEffect(() => {
		project();
	}, []);

	return (
		<Layout {...user}>
			<>
				<Container>
					<div className="mt-5">
						<h2 id="project_name">{projects.name}</h2>
					</div>
					<Row className="bg-light pt-3 rounded">
						<Col>
							<p className="mb-0 createdBy">Created by</p>
							<p id="project_author">{name}</p>
						</Col>
						<Col>
							<p className="mb-0">Date Created</p>
							<p>{createdAt}</p>
						</Col>
						<Col>
							<p className="mb-0">Last Updated</p>
							<p>{lastUpdated}</p>
						</Col>
						<Col>
							<Button variant="primary" className="float-right" href="">
								Edit Project
							</Button>
						</Col>
					</Row>
					<Row>
						<Col>
							<FormGroup>
								<h3 className="mt-5">Project Abstract</h3>
								<hr className="hori" />
								<p id="project_abstract">{projects.abstract}</p>
							</FormGroup>
							<FormGroup>
								<h3 className="mt-5">Comments</h3>
								<FormControl
									as="textarea"
									rows="5"
									id="abstract"
									name="comments"
									placeholder="Leave a comment..."
								/>
							</FormGroup>
							<FormGroup>
								<Button variant="primary">Submit</Button>
								<hr />
							</FormGroup>
							<FormGroup className="text-center">
								<p className="my-4 mx-3">No comments added yet</p>
							</FormGroup>
						</Col>

						<Col className="mb-5">
							<h3 className="mt-5">Project Details</h3>
							<hr />
							<Card className="border bg-light">
								<h5 className="my-4 mx-3">Author(s)</h5>
							</Card>
							{authors.map((authors) => (
								<Card key={authors} className="border">
									<p id="project_authors" className="my-4 mx-3">
										{authors}
									</p>
								</Card>
							))}
							<Card className="border bg-light">
								<p className="my-4 mx-3 text-primary" id="project_tags">
									{projects.tags}
								</p>
							</Card>

							<Card className="border mt-5 bg-light">
								<h5 className="my-4 mx-3">Project Files</h5>
							</Card>
							<Card className="border text-center">
								<p className="my-4 mx-3">No files uploaded yet</p>
							</Card>
						</Col>
					</Row>
				</Container>
			</>
		</Layout>
	);
};

export default Project;
