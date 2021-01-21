import react from 'react';
import Header from './Header';
import Footer from './Footer';
import { Container } from 'react-bootstrap';

export default (props) => {
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
