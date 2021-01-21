import React, { useState} from 'react';
import Layout from './shared/Layout';
import { useHistory } from 'react-router-dom';
import { Container, Form, FormControl, FormGroup, Button, Alert } from 'react-bootstrap';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setError] = useState('');
	let history = useHistory();

	const handleInputChange = (event) => {
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
	const handleLogin = event => {
		event.preventDefault();
		const data = {
			email: email,
			password: password,
		};
		fetch('/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.status === 'ok') {
					alert(email)
					document.cookie = `uid=${data.data.id}; path=/`;
					history.push('/');
				} else {
					setError('Invalid email/password');
				}
			});
	};
	return (
		<Layout>
			<>
				<Container className="border rounded p-5 mt-3 mb-4">
					<Form className="justify-content-center" id="loginForm">
						<h1>Login</h1>
						{errors ? <Alert variant="danger">{errors}</Alert> : null}
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
						<Button variant="primary" type="submit" onClick={handleLogin}>
							Login
						</Button>
					</Form>
				</Container>
			</>
		</Layout>
	);
};
export default Login;