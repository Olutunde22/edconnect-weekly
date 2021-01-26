import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import CreateProject from './CreateProject';
import Project from './Project';
import './App.css';
import { getCookie } from './shared/cookie';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

const uid = getCookie('uid');
function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" exact={true} component={Home} />
				<Route path="/login" exact={true} component={Login} />
				<Route path="/signup" exact={true} component={Signup} />
				{uid ? (
					<Route path="/project/submit" exact={true} component={CreateProject} />
				) : (
					<Redirect to="/login" />
				)}
				<Route path="/project/:id" component={Project} />
			</Switch>
		</Router>
	);
}

export default App;
