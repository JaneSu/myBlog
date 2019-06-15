import React from 'react'

import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import FrontIndex from './front/index'

function App() {
	return (
		<Router path="/">
			<Switch>
				<Route path="/front" component={FrontIndex} />
			</Switch>
		</Router>
	)
}

export default App
