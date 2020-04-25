import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import ArcGisTrail from './pages/ArcGisTrail';

function App() {
  return (
	<div className="App">
		<Router>
			<div>
				<Route path="/" component={ArcGisTrail} />
			</div>
		</Router>
	</div>
  );
}

export default App;
