/**
	React-bootstrap Modal code gotten from https://react-bootstrap.github.io/components/modal/ and was edited to fit project
 */
import React, { useState, useEffect } from 'react';
import Layout from './shared/Layout';
import CreateNewCollection from './shared/createNewCollection';
import { Button, Form, Modal, Alert, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import {
	MdDelete,
	MdDeleteForever,
	MdLibraryAdd,
	MdInfoOutline,
	MdPublic,
	MdVpnLock,
	MdContentCopy,
} from 'react-icons/md';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import moment from 'moment';

const MyCollection = (props) => {
	const { User } = props;
	const { createdBy } = props;
	const [collection, setCollections] = useState('');
	const [projects, setProjects] = useState([]);
	const [CollectionName, setCollectionName] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [deleteShow, setDeleteShow] = useState(false);

	const DeleteClose = () => setDeleteShow(false);
	const DeleteShow = () => setDeleteShow(true);

	useEffect(() => {
		setError(props.error);
		setSuccess(props.success);
		setCollections(props.collection);
		setProjects(props.collection.projects);
	}, []);

	const handleInputChange = (event) => {
		const { value } = event.target;
		setCollectionName(value);
	};

	const handleCopy = (event) => {
		event.preventDefault();
		setSuccess('Copied!');
	};

	return (
		<Layout {...User}>
			<>
				{error.length > 0 ? <Alert variant="warning">{error}</Alert> : null}
				{success.length > 0 ? <Alert variant="success">{success}</Alert> : null}
				<Row>
					<Col>
						<h2 className="mt-5 mb-5">{collection.name}</h2>
					</Col>
				</Row>

				<Row>
					<Col>
						{JSON.stringify(User._id) === JSON.stringify(createdBy) ? (
							<CreateNewCollection />
						) : JSON.stringify(User._id) !== JSON.stringify(createdBy) ? (
							<Form method="POST" action="addToLibrary" path="/addToLibrary">
								<OverlayTrigger
									placement="top"
									delay={{ show: 250, hide: 400 }}
									overlay={<Tooltip>Add to Collection</Tooltip>}
								>
									<Button variant="secondary" type="submit">
										<MdLibraryAdd />
									</Button>
								</OverlayTrigger>

								<input type="hidden" name="collectionID" value={collection._id} />
							</Form>
						) : null}
					</Col>
					<Col>
						{User._id === createdBy ? (
							<Form method="POST" action="visibility" path="/visibility">
								<OverlayTrigger
									placement="top"
									delay={{ show: 250, hide: 400 }}
									overlay={
										<Tooltip>
											{collection.visibility === 'Private'
												? 'Make collection Public'
												: 'Make collection Private'}
										</Tooltip>
									}
								>
									<Button variant="secondary" type="submit">
										{collection.visibility === 'Private' ? <MdPublic /> : <MdVpnLock />}
									</Button>
								</OverlayTrigger>
								<input type="hidden" name="visibility" value={collection.visibility} />
								<input type="hidden" name="collectionID" value={collection._id} />
							</Form>
						) : null}
					</Col>
					<Col>
						{collection.visibility === 'Public' ? (
							<OverlayTrigger
								placement="top"
								delay={{ show: 250, hide: 400 }}
								overlay={<Tooltip>Copy link to collection</Tooltip>}
							>
								<CopyToClipboard text={props.location}>
									<Button variant="info" onClick={handleCopy}>
										<MdContentCopy />
									</Button>
								</CopyToClipboard>
							</OverlayTrigger>
						) : null}
					</Col>
					<Col>
						{User._id === createdBy ? (
							<OverlayTrigger
								placement="top"
								delay={{ show: 250, hide: 400 }}
								overlay={<Tooltip>Delete Collection</Tooltip>}
							>
								<Button variant="danger" onClick={DeleteShow}>
									<MdDeleteForever />
								</Button>
							</OverlayTrigger>
						) : null}

						<Modal show={deleteShow} onHide={DeleteClose}>
							<Form method="POST" action="deleteCollection" path="/deleteCollection">
								<Modal.Header closeButton>
									<p className="text-danger font-weight-bold">
										<MdInfoOutline /> This will delete this collection and remove all projects
										inside, type the name of the collection below to continue
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
										disabled={CollectionName !== collection.name ? true : false}
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
						<table id="tableID" className="table mt-5">
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
									projects.map((projects) => (
										<tr key={projects.name}>
											<td>
												<a href={`/project/${projects._id}`} className="text-primary">
													{' '}
													{projects.name}
												</a>
											</td>
											<td>{projects.authors}</td>
											<td>{moment(projects.createdAt).format('MMMM Do, YYYY.')}</td>

											{User._id === createdBy ? (
												<td>
													<Form method="POST" action="delete" path="/delete">
														<OverlayTrigger
															placement="top"
															delay={{ show: 250, hide: 400 }}
															overlay={<Tooltip>Remove project from collection</Tooltip>}
														>
															<Button variant="danger" onClick={DeleteShow}>
																<MdDelete />
															</Button>
														</OverlayTrigger>
														<input type="hidden" name="projectID" value={projects._id} />
														<input type="hidden" name="collectionID" value={collection._id} />
													</Form>
												</td>
											) : null}
										</tr>
									))
								) : (
									<tr>
										<td>No project in this collection</td>
									</tr>
								)}
							</tbody>
						</table>
					</Col>
				</Row>
			</>
		</Layout>
	);
};
export default MyCollection;
