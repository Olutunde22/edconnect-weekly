import React, { useEffect, useState } from 'react';
import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import {getCookie} from './cookie';

const Header = () => {
	const [username, setUsername] = useState('');
	let history = useHistory();

	const getUserInfo = (uid) => {
		return fetch(`/api/users/${uid}`, {
			method: 'GET',
		})
			.then((res) => res.json())
			.then((res) => {
				setUsername(res.firstname);
			});
	};
	useEffect(() => {
		const uid = getCookie('uid');
		if (uid) {
			getUserInfo(uid);			
		}
	}, []);
	const logoutUser = () => {
		document.cookie = 'uid= ; path=/; expires = Thu, 01 Jan 1970 00:00:00 GMT';
		history.push('/')
	}
	return (
		<Navbar bg="primary" variant="dark" className="justify-content-between" expand="lg">
			<Navbar.Brand href="/">Project Explorer</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Form inline>
					<FormControl type="text" placeholder="Search" className="mr-sm-2" />
					<Button variant="outline-light">Search</Button>
				</Form>
				<Nav className="mr-auto">
					<Nav.Link href="/projects">Projects</Nav.Link>
					<Nav.Link href="/project/submit">Create project</Nav.Link>
				</Nav>
				{username !== '' || null ? (
					<Nav className="justify-content-end">
						<Nav.Link eventKey="" onSelect={logoutUser}>Logout</Nav.Link>
						<Nav.Link disabled>Hi, {username} </Nav.Link>	
					</Nav>
				) : (
					<Nav className="justify-content-end">
						<Nav.Link href="/signup">Sign Up</Nav.Link>
						<Nav.Link href="/login">Login</Nav.Link>
					</Nav>
				)}
			</Navbar.Collapse>
		</Navbar>
	);
};
export default Header;