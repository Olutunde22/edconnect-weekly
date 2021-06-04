/**
	React-bootstrap Modal and tooltip code gotten from https://react-bootstrap.github.io/components/modal/ ,
     https://react-bootstrap.github.io/components/overlays/ and was edited to fit project
 */

import React, { useState } from 'react';
import { Form, Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { MdCreate } from 'react-icons/md';

const CreateNewCollection = (props) => {
	const [collectShow, setCollectShow] = useState(false);
	const CollectClose = () => setCollectShow(false);
	const CollectShow = () => setCollectShow(true);
	const [NewCollectionName, setNewCollectionName] = useState('');

	const handleInputChange = (event) => {
		const { value } = event.target;
		setNewCollectionName(value);
	};

	return (
		<>
			<OverlayTrigger
				placement="top"
				delay={{ show: 250, hide: 400 }}
				overlay={<Tooltip>Create new collection</Tooltip>}
			>
				<Button variant={props.variant} onClick={CollectShow}>
					<MdCreate />
				</Button>
			</OverlayTrigger>
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
					{props.projects !== undefined ? (
						<input type="hidden" name="projectID" value={props.projects} />
					) : null}
				</Form>
			</Modal>
		</>
	);
};
export default CreateNewCollection;
