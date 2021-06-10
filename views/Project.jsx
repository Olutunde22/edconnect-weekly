/**
	React-bootstrap Modal code gotten from https://react-bootstrap.github.io/components/modal/ and was edited to fit project
 */
import React, { useEffect, useState } from 'react';
import Layout from './shared/Layout';
import CreateNewCollection from './shared/createNewCollection';
import {
	Container,
	FormControl,
	FormGroup,
	Button,
	Row,
	Col,
	Card,
	Modal,
	Form,
	Alert,
} from 'react-bootstrap';

const Project = (props) => {
	const { user } = props;
	const { colID } = props;
	const [projects, setProjects] = useState([]);
	const [createdBy, setCreatedBy] = useState('');
	const [authors, setAuthors] = useState([]);
	const [createdAt, setCreatedAt] = useState('');
	const [lastUpdated, setLastUpdated] = useState('');
	const [collectionName, setCollectionName] = useState([]);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [saved, setSaved] = useState(false);
	const [show, setShow] = useState(false);

	let created = new Date(props.Project.createdAt).toLocaleDateString();
	let updated = new Date(props.Project.updatedAt).toLocaleDateString();

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(() => {
		setProjects(props.Project);
		setCreatedBy(props.User.firstname + ' ' + props.User.lastname);
		setAuthors(props.Project.authors);
		setCreatedAt(created);
		setLastUpdated(updated);
		setCollectionName(props.collectionNames);
		setError(props.error);
		setSuccess(props.success);
		setSaved(props.saved);
	}, []);

	return (
		<Layout {...user}>
			<>
				<Container>
					{error.length > 0 ? <Alert variant="warning">{error}</Alert> : null}
					{success.length > 0 ? <Alert variant="success">{success}</Alert> : null}
					<Row>
						<Col>
							<div className="mt-5">
								<h2 id="project_name">{projects.name}</h2>
							</div>
						</Col>
						<Col className="mt-5">
							{user != undefined ? (
								saved ? (
									<Form method="POST" action="unsave" path="/unsave">
										<Button className="click_btn" variant="primary" type="submit">
											Unsave from collection
										</Button>
										<input type="hidden" name="projectID" value={projects._id} />
										<input type="hidden" name="colID" value={colID} />
									</Form>
								) : (
									<Button className="click_btn" variant="primary" onClick={handleShow}>
										Save to Collection
									</Button>
								)
							) : null}

							<Modal show={show} onHide={handleClose}>
								<Form method="POST" action="save" path="/save">
									<Modal.Header closeButton>
										<Modal.Title>Add this project to a collection</Modal.Title>
									</Modal.Header>
									<Modal.Body>
										<Form.Control as="select" name="name" value={collectionName.name}>
											<option>Choose...</option>
											{collectionName.length > 0
												? collectionName.map((collection) => (
														<option key={collection.name}>{collection.name}</option>
												  ))
												: null}
										</Form.Control>
									</Modal.Body>
									<Modal.Footer>
										<CreateNewCollection variant={'secondary'} projects={projects._id} />

										<Button variant="primary" type="submit">
											Save
										</Button>
										<input type="hidden" name="projectID" value={projects._id} />
									</Modal.Footer>
								</Form>
							</Modal>
						</Col>
					</Row>
					<Row className="bg-light pt-3 rounded">
						<Col>
							<p className="mb-0 createdBy">Created by</p>
							<p id="project_author">{createdBy}</p>
						</Col>
						<Col>
							<p className="mb-0">Date Created</p>
							<p>{createdAt}</p>
						</Col>
						<Col>
							<p className="mb-0">Last Updated</p>
							<p>{lastUpdated}</p>
						</Col>
					</Row>
					<Row>
						<Col md={12} sm={12} lg={6}>
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

						<Col className="mb-5" md={12} sm={12} lg={6}>
							<h3 className="mt-5">Project Details</h3>
							<hr />
							<Card className="border bg-light">
								<h5 className="my-4 mx-3">Author(s)</h5>
							</Card>

							<Card key={authors} className="border" id="project_authors">
								{authors.map((authors) => (
									<p className="my-4 mx-3">{authors}</p>
								))}
							</Card>

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
