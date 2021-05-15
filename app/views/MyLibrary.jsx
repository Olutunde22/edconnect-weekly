import React, { useState, useEffect } from 'react';
import Layout from './shared/Layout';
import { Button, Form, Modal, Alert, Row, Col } from 'react-bootstrap';

const MyCollection = props => {
	const { User } = props;
	const [collection, setCollections] = useState([]);
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
						<Form method="POST" action="Status" path="/status">
							<Button variant="primary" type="submit">
								{collection.status === 'Private' ? 'Make Public' : 'Make Private'}
							</Button>
                            <input type="hidden" name="status" value={collection.status}/>
                            <input type="hidden" name="collectionID" value={collection._id}/>
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
								</tr>
							</thead>
							<tbody>
								{/* {collection.projects.length > 0 ? (
									collection.projects.map(project => (
										<tr>
											<td>{project.name}</td>
											<td>{project.authors}</td>
											<td>{project.createdAt}</td>
										</tr>
									))
								) : (
									<h3 className="mt-3">No Project in this collection</h3>
								)} */}
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
