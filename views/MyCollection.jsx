import React, { useState, useEffect } from 'react';
import Layout from './shared/Layout';
import CreateNewCollection from './shared/createNewCollection';
import { Card, Alert, FormControl } from 'react-bootstrap';

const MyCollection = (props) => {
	const { User } = props;
	const [collections, setCollections] = useState([]);
	const [collectionOwner, setCollectionOwner] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [searchCollections, setSearchCollections] = useState('');

	useEffect(() => {
		setError(props.error);
		setSuccess(props.success);
		setCollections(props.collection);
		setCollectionOwner(props.name);
	}, []);

	const handleInputChange = (event) => {
		const { value } = event.target;

		setSearchCollections(value);
	};

	return (
		<Layout {...User}>
			<>
				{error.length > 0 ? <Alert variant="warning">{error}</Alert> : null}
				{success.length > 0 ? <Alert variant="success">{success}</Alert> : null}
				<h2 className="mt-5">{collectionOwner}'s Collections</h2>
				<div>
					<CreateNewCollection variant={'primary'}/>
				</div>

				<FormControl
					type="text"
					placeholder="Search..."
					name="search"
					className="mr-sm-2 mb-3 mt-5"
					onChange={handleInputChange}
					value={searchCollections}
				/>

				{collections.length > 0 ? (
					collections
						.filter((collections) => {
							if (searchCollections == '') {
								return collections;
							} else if (collections.name.toLowerCase().includes(searchCollections.toLowerCase())) {
								return collections;
							}
						})
						.map((collections) => (
							<Card key={collections.name} className="border p-3 mb-3">
								<a href={`/MyLibrary/${collections._id}`} className="text-primary">
									{' '}
									{collections.name}
								</a>
							</Card>
						))
				) : (
					<p>Sorry you have not yet created a collection, create one now</p>
				)}
			</>
		</Layout>
	);
};
export default MyCollection;
