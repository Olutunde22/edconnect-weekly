import Header from './Header';
import Footer from './Footer';
import React from 'react';
import { Container } from 'react-bootstrap';

const Layout = (props) => {
	const { children, ...rest } = props;
 
	return (
		<>
			<Header {...rest}/>
			<Container className="mt-3">
				{children}
				<Footer />
			</Container>
		</>
	);
};
export default Layout;