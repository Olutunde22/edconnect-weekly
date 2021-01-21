import React, { useState, useEffect } from 'react';
import Layout from './shared/Layout';
import { Jumbotron, Button, Container, Row, Col, Card } from 'react-bootstrap';

export default () => {
	const projects =()=> {
		return fetch(`/api/projects`, {
			method: 'GET',
		})
			.then((res) => res.json())
			.then((res) => {
				setProjects(res);
			});
	}

	const [project, setProjects] = useState([]);

	useEffect(() => {
		projects();
	}, []);

	return (
		<Layout>
			<>
				<Jumbotron>
					<h1 className="jumbotron-heading">Welcome to Project Explorer</h1>
					<p className="lead text-muted">
						Project Explorer is a repository for final year projects across all departments at your
						institution. You can upload and search projects and learn from others.
					</p>
					<Button variant="primary mr-3" href="/signup">
						Get Started
					</Button>
					<Button variant="secondary" href="/login">
						Login
					</Button>
				</Jumbotron>

				<Container>
					<Row>
						{project.slice(0, 4).map((proj) => (
							<Col key={proj.name} className="col-md-3">
								<Card className="mb-4 box-shadow">
									<Card.Body>
										<a href={`/project/${proj.id}`} className="text-primary">
											{' '}
											{proj.name}
										</a>
										<Card.Text>{proj.authors}</Card.Text>
										<Card.Text>{proj.abstract}</Card.Text>
										<div className="d-flex justify-content-between align-items-center">
											<p className="text-primary">{proj.tags}</p>
										</div>
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>
				</Container>
			</>
		</Layout>
	);
};
