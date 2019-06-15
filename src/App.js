import React from 'react'

import './App.css'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import FrontIndex from './front/index'

function App() {
	return (
		<Router path="/">
			<div className="App">
				<Switch>
					<Route path="/front" component={FrontIndex} />
					<Redirect path="/" to={{ pathname: '/front/home' }} />
				</Switch>
			</div>
		</Router>
	)
}

export default App
