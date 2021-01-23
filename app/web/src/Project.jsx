import React, { useEffect, useState } from 'react';
import Layout from './shared/Layout';
import { useParams } from 'react-router-dom';
import { Container, FormControl, FormGroup, Button, Row, Col, Card } from 'react-bootstrap';

const Project = () => {
	const { id } = useParams();
	const [projects, setProjects] = useState([]);
	const [name, setName] = useState('');
	const [authors, setAuthors] = useState([]);

	const project = () => {
		return fetch(`/api/projects/${id}`, {
			method: 'GET',
		})
			.then((res) => res.json())
			.then((res) => {
				setProjects(res);
				getUserName(res.createdBy);
				setAuthors(res.authors);
			});
	};

	const getUserName = (id) => {
		return fetch(`/api/users/${id}`, {
			method: 'GET',
		})
			.then((res) => res.json())
			.then((res) => {
				var name = `${res.firstname}  ${res.lastname}`;
				setName(name);
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		project();
	}, []);


	return (
		<Layout>
			<>
				<Container>
					<div class="mt-5">
						<h2 id="project_name">{projects.name}</h2>
					</div>
					<Row className="bg-light pt-3 rounded">
						<Col>
							<p class="mb-0 createdBy">Created by</p>
							<p id="project_author">{name}</p>
						</Col>
						<Col>
							<p class="mb-0">Date Created</p>
							<p>2020-08-04</p>
						</Col>
						<Col>
							<p class="mb-0">Last Updated</p>
							<p>2020-08-04</p>
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
								<h3 class="mt-5">Project Abstract</h3>
								<hr class="hori" />
								<p id="project_abstract">{projects.abstract}</p>
								
							</FormGroup>
							<FormGroup>
								<h3 class="mt-5">Comments</h3>
								<FormControl
									as="textarea"
									rows="5"
									id="abstract"
									name="comments"
									class="form-control"
									placeholder="Leave a comment..."
								/>
							</FormGroup>
							<FormGroup>
								<Button variant="primary">Submit</Button>
								<hr />
							</FormGroup>
							<FormGroup className="text-center">
								<p class="my-4 mx-3">No comments added yet</p>
							</FormGroup>
						</Col>

						<Col className="mb-5">
							<h3 class="mt-5">Project Details</h3>
							<hr />
							<Card className="border bg-light">
								<h5 class="my-4 mx-3">Author(s)</h5>
							</Card>
							{authors.map((authors) => (
								<Card className="border">
									<p id="project_authors" class="my-4 mx-3">{authors}</p>
								</Card>
							))}
							<Card className="border bg-light">
								<p class="my-4 mx-3 text-primary" id="project_tags">{projects.tags}</p>
							</Card>

							<Card className="border mt-5 bg-light">
								<h5 class="my-4 mx-3">Project Files</h5>
							</Card>
							<Card className="border text-center">
								<p class="my-4 mx-3">No files uploaded yet</p>
							</Card>
						</Col>
					</Row>
				</Container>
			</>
		</Layout>
	);
};


export default Project;