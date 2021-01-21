import Header from './Header';
import Footer from './Footer';
import React from 'react';
import { Container } from 'react-bootstrap';

const Layout = (props) => {
	return (
		<>
			<Header />
			<Container className="mt-3">
				{props.children}
				<Footer />
			</Container>
		</>
	);
};
export default Layout;