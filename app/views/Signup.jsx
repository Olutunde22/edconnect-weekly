import React, { useState, useEffect } from 'react';
import { Container, Form, Col, Button, Alert } from 'react-bootstrap';
import Layout from './shared/Layout';

const Signup = (props) => {
	const {user} = props
	const [firstName, setFirstname] = useState('');
	const [lastName, setLastname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [program, setProgram] = useState();
	const [matricNumber, setMatricNum] = useState('');
	const [graduationYear, setGraduationyear] = useState();
	const [error, setError] = useState('');
	const [programs, setPrograms] = useState([]);
	const [gradYear, setGradYear] = useState([]);


	useEffect(() => {
		setPrograms(props.getPrograms)
		setGradYear(props.getGradYears)
		setError(props.error)
	}, []);


	const handleInputChange = (event) => {
		const { name, value } = event.target;

		switch (name) {
			case 'firstName':
				setFirstname(value);
				break;
			case 'lastName':
				setLastname(value);
				break;
			case 'email':
				setEmail(value);
				break;
			case 'password':
				setPassword(value);
				break;
			case 'program':
				setProgram(value);
				break;
			case 'matricNumber':
				setMatricNum(value);
				break;
			case 'graduationYear':
				setGraduationyear(value);
		}
	};

	return (
		<Layout {...user}>
			<>
				<Container>
					<Form className="my-5" id="signupForm" method="POST" action="signup">
						<h1>Sign Up</h1>
						{error.length > 0 ? (
							<Alert variant="danger">
								{error.map((error) => (
									<p key={error}>{error}</p>
								))}
							</Alert>
						) : null}
						<Form.Row>
							<Form.Group as={Col}>
								<Form.Label>First Name</Form.Label>
								<Form.Control
									value={firstName}
									onChange={handleInputChange}
									type="text"
									placeholder="First Name"
									id="firstname"
									name="firstName"
								/>
							</Form.Group>
							<Form.Group as={Col}>
								<Form.Label>Last Name</Form.Label>
								<Form.Control
									value={lastName}
									onChange={handleInputChange}
									type="text"
									placeholder="Last Name"
									id="lastname"
									name="lastName"
								/>
							</Form.Group>
						</Form.Row>
						<Form.Row>
							<Form.Group as={Col}>
								<Form.Label>Email Address</Form.Label>
								<Form.Control
									value={email}
									onChange={handleInputChange}
									type="email"
									placeholder="example@example.com"
									id="email"
									name="email"
								/>
							</Form.Group>
							<Form.Group as={Col}>
								<Form.Label>Password</Form.Label>
								<Form.Control
									value={password}
									onChange={handleInputChange}
									type="password"
									placeholder="Password"
									id="password"
									name="password"
								/>
							</Form.Group>
						</Form.Row>
						<Form.Row>
							<Form.Group as={Col}>
								<Form.Label>Program</Form.Label>
								<Form.Control
									as="select"
									id="program"
									name="program"
									value={program}
									onChange={handleInputChange}
								>
									<option>Choose...</option>
									{programs.map((prog) => (
										<option key={prog}>{prog}</option>
									))}
								</Form.Control>
							</Form.Group>
							<Form.Group as={Col}>
								<Form.Label>Matric Number</Form.Label>
								<Form.Control
									value={matricNumber}
									onChange={handleInputChange}
									type="text"
									placeholder="00/0000"
									id="matricNumber"
									name="matricNumber"
								/>
							</Form.Group>
							<Form.Group as={Col}>
								<Form.Label>Graduation Year</Form.Label>
								<Form.Control
									as="select"
									id="graduationYear"
									name="graduationYear"
									value={graduationYear}
									onChange={handleInputChange}
								>
									<option>Choose...</option>
									{gradYear.map((grad) => (
										<option key={grad}>{grad}</option>
									))}
								</Form.Control>
							</Form.Group>
						</Form.Row>
						<Button variant="primary" type="Submit">
							Sign Up
						</Button>
					</Form>
				</Container>
			</>
		</Layout>
	);
};

export default Signup;
