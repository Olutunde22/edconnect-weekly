import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import CreateProject from './CreateProject';
import Project from './Project';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" exact={true} component={Home} />
				<Route path="/login" component={Login} />
				<Route path="/signup" component={Signup} />
				<Route path="/project/submit" component={CreateProject} />
				<Route path="/project/:id" component={Project} />
			</Switch>
		</Router>
	);
}

export default App;
