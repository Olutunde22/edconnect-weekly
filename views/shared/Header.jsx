import React from 'react';
import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';


const Header = ({firstname}) => {
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
					<Nav.Link href="/MyCollection">My Library</Nav.Link>
					<Nav.Link href="/projects/submit">Create Project</Nav.Link>
				</Nav>
				{firstname !== undefined ? (
					<Nav className="justify-content-end">
						<Nav.Link href="/logout"eventKey="">Logout</Nav.Link>
						<Nav.Link id="username"href="" disabled>Hi, {firstname} </Nav.Link>	
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