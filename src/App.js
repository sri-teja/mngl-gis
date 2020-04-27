import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import ArcGisTrail from './pages/ArcGisTrail';
import Login from './pages/Login';

function App() {
  return (
	<div>
		<Router>
			<div>
				<Route path="/map" component={ArcGisTrail} />
				<Route path="/login" component={Login} />
				<Route path="/" component={Login} />
			</div>
		</Router>
	</div>
  );
}

export default App;
