import React, { useState, useEffect } from 'react';
import Layout from './shared/Layout';
import { Button, Card, Form, Modal } from 'react-bootstrap';

const MyCollection = props => {
	const { User } = props;
	const [collections, setCollections] = useState([]);
	const [collectionOwner, setCollectionOwner] = useState('');
	const [NewCollectionName, setNewCollectionName] = useState('');
	const [collectShow, setCollectShow] = useState(false);
	const CollectClose = () => setCollectShow(false);
	const CollectShow = () => setCollectShow(true);

	useEffect(() => {
		setCollections(props.collection);
		setCollectionOwner(props.name);
	}, []);
	const handleInputChange = event => {
		const { value } = event.target;
		setNewCollectionName(value);
	};

	return (
		<Layout {...User}>
			<>
				<h2>{collectionOwner}'s Collection</h2>
				<div>
					<Button className="mb-2" variant="primary" onClick={CollectShow}>
						Create New Collection
					</Button>
				</div>

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

				{collections.length > 0 ? (
					collections.map(collections => (
						<Card className="border p-3 mb-3">
							<a href={`/MyLibrary/${collections._id}`} className="text-primary">
								{' '}
								{collections.name}
							</a>
						</Card>
					))
				) : (
					<h2>Sorry you have not yet created a collection, create one now</h2>
				)}
			</>
		</Layout>
	);
};
export default MyCollection;
