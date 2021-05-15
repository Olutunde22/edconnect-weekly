import React, { useState, useEffect } from 'react';
import Layout from './shared/Layout';
import { Card } from 'react-bootstrap';

const MyCollection = props => {
	const { User } = props;
	const [collections, setCollections] = useState([]);
	const [collectionOwner, setCollectionOwner] = useState('')

	useEffect(() => {
		setCollections(props.collection);
		setCollectionOwner(props.name)
	}, []);

	return (
		<Layout {...User}>
			<>
			<h2>{collectionOwner}'s Collection</h2>
				{collections.length > 0 ? (
					<Card className="border p-3 mb-3" id="project_authors">
						{collections.map(collections => (
							<a href={`/MyLibrary/${collections._id}`} className="text-primary">
								{' '}
								{collections.name}
							</a>
						))}
					</Card>
				) : (
					<h2>Sorry you have not yet created a collection, create one now</h2>
				)}
			</>
		</Layout>
	);
};
export default MyCollection;
