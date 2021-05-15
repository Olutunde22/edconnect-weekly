import React, { useState, useEffect} from 'react';
import Layout from './shared/Layout';
import { Container, Form, FormControl, FormGroup, Button, Alert } from 'react-bootstrap';

const Login = (props) => {
	const {user} = props
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setError] = useState('');

	const handleInputChange = event => {
		const { name, value } = event.target;	
		switch (name) {
			case 'email':
				setEmail(value);
				break;
			case 'password':
				setPassword(value);
				break;
		}
	};	

	useEffect(() => {
		setError(props.error)
	}, []);

	return (
		<Layout {...user}>
			<>
				<Container className="border rounded p-5 mt-3 mb-4">
					<Form className="justify-content-center" id="loginForm" method="post" action="login">
						<h1>Login</h1>
						{errors.length > 0 ? <Alert variant="danger">{errors}</Alert> : null}
						<FormGroup>
							<Form.Label>Email address</Form.Label>
							<FormControl
								type="email"
								name="email"
								placeholder="Email Address"
								value={email}
								onChange={handleInputChange}
							/>
						</FormGroup>
						<FormGroup>
							<Form.Label>Password</Form.Label>
							<FormControl
								type="password"
								name="password"
								placeholder="Password"
								value={password}
								onChange={handleInputChange}
							/>
						</FormGroup>
						<Button variant="primary" type="submit">
							Login
						</Button>
					</Form>
				</Container>
			</>
		</Layout>
	);
};
export default Login;