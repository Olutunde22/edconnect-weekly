import React, { useState, useEffect } from 'react';
import Layout from './shared/Layout';
import { Button, Form, Modal, Alert, Row, Col } from 'react-bootstrap';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const MyCollection = props => {
	const { User } = props;
	const [collection, setCollections] = useState('');
	const [projects, setProjects] = useState([]);
	const [allCollection, setAllCollections] = useState([]);
	const [NewCollectionName, setNewCollectionName] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [collectShow, setCollectShow] = useState(false);
	const CollectClose = () => setCollectShow(false);
	const CollectShow = () => setCollectShow(true);

	useEffect(() => {
		setError(props.error);
		setSuccess(props.success);
		setCollections(props.collection);
		setAllCollections(props.Collection);
		setProjects(props.collection.projects);
	}, []);

	const handleInputChange = event => {
		const { value } = event.target;
		setNewCollectionName(value);
	};

	return (
		<Layout {...User}>
			<>
				{error.length > 0 ? <Alert variant="warning">{error}</Alert> : null}
				{success.length > 0 ? <Alert variant="success">{success}</Alert> : null}
				<h2 className="mt-5 mb-5">My Library</h2>
				<Row>
					<Col xs={2}>
						<Button variant="primary" onClick={CollectShow}>
							Create Collection
						</Button>
					</Col>
					<Col xs={8}>
						<h2>{collection.name}</h2>
					</Col>
					<Col>
						<Form method="POST" action="status" path="/status">
							<Button variant="primary" type="submit">
								{collection.status === 'Private' ? 'Make Public' : 'Make Private'}
							</Button>
							<input type="hidden" name="status" value={collection.status} />
							<input type="hidden" name="collectionID" value={collection._id} />
						</Form>
					</Col>
				</Row>

				<Row>
					<Col xs={2}>
						<div className="mt-5">
							{allCollection.length > 0
								? allCollection.map(collection => (
										<a href={`/MyLibrary/${collection._id}`} className="text-primary btn">
											{' '}
											{collection.name}
										</a>
								  ))
								: null}
						</div>
					</Col>
					<Col xs={10}>
						<table className="table mt-5">
							<thead>
								<tr>
									<th scope="col">Title</th>
									<th scope="col">Authors</th>
									<th scope="col">Date Created</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{projects.length > 0 ? (
									projects.map(projects => (
										<tr>
											<td>
												<a href={`/project/${projects._id}`} className="text-primary">
													{' '}
													{projects.name}
												</a>
											</td>
											<td>{projects.authors}</td>
											<td>{projects.createdAt}</td>
											<td>
												<Form method="POST" action="delete" path="/delete">
													<IconButton aria-label="delete" type="submit">
														<DeleteIcon />
													</IconButton>
													<input type="hidden" name="projectID" value={projects._id} />
													<input type="hidden" name="collectionID" value={collection._id} />
												</Form>
											</td>
										</tr>
									))
								) : (
									<h3>No project in this collection</h3>
								)}
							</tbody>
						</table>
					</Col>
				</Row>

				<Modal show={collectShow} onHide={CollectClose}>
					<Form method="POST" action="createCollection" path="/createCollection">
						<Modal.Header closeButton>
							<Modal.Title>Collection Name</Modal.Title>
						</Modal.Header>

						<Modal.Body>
							<Form.Control
								value={NewCollectionName}
								onChange={handleInputChange}
								type="text"
								placeholder="Collection Name"
								id="name"
								name="name"
							/>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={CollectClose}>
								Back
							</Button>

							<Button variant="primary" type="submit">
								Create
							</Button>
						</Modal.Footer>
					</Form>
				</Modal>
			</>
		</Layout>
	);
};
export default MyCollection;
