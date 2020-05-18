import React from 'react';
import {HashRouter, Route, BrowserRouter as Router } from 'react-router-dom';
import ArcGisTrail from './pages/ArcGisTrail';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import FeatureLayer from './pages/FeatureLayer';

function App() {
  return (
	
		<HashRouter basnename="/">
				<Route path="/map" component={FeatureLayer} />
				<Route path="/feature" component={FeatureLayer} />
				<Route path="/login" component={Login} />
				<Route exact path="/" component={Login} />
				<Route exact path="/dashboard" component={ArcGisTrail} />
		</HashRouter>
	
  );
}

export default App;
