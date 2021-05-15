import React, { useState, useEffect } from 'react';
import Layout from './shared/Layout';
import { Button, Card, Form, Modal, Alert, FormControl } from 'react-bootstrap';

const MyCollection = props => {
	const { User } = props;
	const [collections, setCollections] = useState([]);
	const [collectionOwner, setCollectionOwner] = useState('');
	const [NewCollectionName, setNewCollectionName] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [searchCollections, setSearchCollections] = useState('');
	const [collectShow, setCollectShow] = useState(false);
	const CollectClose = () => setCollectShow(false);
	const CollectShow = () => setCollectShow(true);

	useEffect(() => {
		setError(props.error);
		setSuccess(props.success);
		setCollections(props.collection);
		setCollectionOwner(props.name);
	}, []);

	const handleInputChange = event => {
		const { name, value } = event.target;

		switch (name) {
			case 'search':
				setSearchCollections(value);
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
				<h2 className="mt-5">{collectionOwner}'s Collections</h2>
				<div>
					<Button className="mb-3" variant="primary" onClick={CollectShow}>
						Create New Collection
					</Button>
				</div>

				<FormControl
					type="text"
					placeholder="Search..."
					name="search"
					className="mr-sm-2 mb-3"
					onChange={handleInputChange}
					value={searchCollections}
				/>

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
					collections
						.filter(collections => {
							if (searchCollections == '') {
								return collections;
							} else if (collections.name.toLowerCase().includes(searchCollections.toLowerCase())){
								return collections;
							}
						})
						.map(collections => (
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
