import React from 'react'
import { Provider } from 'react-redux'

import './App.css'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import FrontIndex from './front/index'
import AdminIndex from './admin/index'
import store from './reducer/index'

function App() {
	return (
		<Provider store={store}>
			<Router path='/'>
				<div className='App'>
					<Switch>
						<Route path='/front' component={FrontIndex} />
						<Route path='/admin' component={AdminIndex} />
						<Redirect path='/' to={{ pathname: '/front/index' }} />
					</Switch>
				</div>
			</Router>
		</Provider>
	)
}

export default App
