import React, { useState, useEffect } from 'react';
import Layout from './shared/Layout';
import { Button, Form, Modal, Alert, Row, Col } from 'react-bootstrap';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const MyCollection = props => {
	const { User } = props;
	const { createdBy } = props;
	const [collection, setCollections] = useState('');
	const [projects, setProjects] = useState([]);
	const [NewCollectionName, setNewCollectionName] = useState('');
	const [CollectionName, setCollectionName] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [collectShow, setCollectShow] = useState(false);
	const [deleteShow, setDeleteShow] = useState(false);

	const CollectClose = () => setCollectShow(false);
	const CollectShow = () => setCollectShow(true);
	const DeleteClose = () => setDeleteShow(false);
	const DeleteShow = () => setDeleteShow(true);

	useEffect(() => {
		setError(props.error);
		setSuccess(props.success);
		setCollections(props.collection);
		setProjects(props.collection.projects);
	}, []);

	const handleInputChange = event => {
		const { name, value } = event.target;

		switch (name) {
			case 'collectionName':
				setCollectionName(value);
				break;
			case 'name':
				setNewCollectionName(value);
		}
	};

	return (
		<Layout {...User}>
			<>
				{error.length > 0 ? <Alert variant="warning">{error}</Alert> : null}
				{success.length > 0 ? <Alert variant="success">{success}</Alert> : null}
				<Row>
					<Col>
						<h2 className="mt-5 mb-5">My Library</h2>
					</Col>
					<Col>
						{User._id === createdBy ? (
							<Button variant="danger" className="mt-5 mb-5" onClick={DeleteShow}>
								Delete Collection
							</Button>
						) : null}

						<Modal show={deleteShow} onHide={DeleteClose}>
							<Form method="POST" action="deleteCollection" path="/deleteCollection">
								<Modal.Header closeButton>
									<p className="text-danger font-weight-bold">
										This will delete this collection and remove all projects inside, type the name
										of the collection below to continue
									</p>
								</Modal.Header>

								<Modal.Body>
									<Form.Control
										value={CollectionName}
										onChange={handleInputChange}
										type="text"
										placeholder="Collection Name"
										id="collectionName"
										name="collectionName"
									/>
								</Modal.Body>
								<Modal.Footer>
									<Button variant="secondary" onClick={DeleteClose}>
										Back
									</Button>

									<Button
										variant="danger"
										className={`${CollectionName !== collection.name ? 'disabled' : 'active'}`}
										type="submit"
									>
										Delete
									</Button>
									<input type="hidden" name="collectionID" value={collection._id} />
								</Modal.Footer>
							</Form>
						</Modal>
					</Col>
				</Row>

				<Row>
					<Col>
						{User._id === createdBy ? (
							<Button variant="primary" onClick={CollectShow}>
								Create Collection
							</Button>
						) : User ? (
							<Button variant="primary" onClick={CollectShow}>
								Add To Library
							</Button>
						) : null}
					</Col>
					<Col lg={6}>
						<h2>{collection.name}</h2>
					</Col>
					<Col>
						{User._id === createdBy ? (
							<Form method="POST" action="status" path="/status">
								<Button variant="primary" type="submit">
									{collection.status === 'Private' ? 'Make Public' : 'Make Private'}
								</Button>
								<input type="hidden" name="status" value={collection.status} />
								<input type="hidden" name="collectionID" value={collection._id} />
							</Form>
						) : null}
					</Col>
				</Row>

				<Row>
					<Col>
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
											{User._id === createdBy ? (
												<td>
													<Form method="POST" action="delete" path="/delete">
														<IconButton aria-label="delete" type="submit">
															<DeleteIcon />
														</IconButton>
														<input type="hidden" name="projectID" value={projects._id} />
														<input type="hidden" name="collectionID" value={collection._id} />
													</Form>
												</td>
											) : null}
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
					<Form method="POST" action="createCollection" path="/MyLibrary/createCollection">
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
