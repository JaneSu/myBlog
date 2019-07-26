import React from 'react'
import LoginIndex from './login/index'
import homeIndex from './home/index'
import RenderRoute from '../components/renderRoute'

import { Route, Switch, withRouter } from 'react-router-dom'

class AdminIndex extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<div className='admin-container' style={{ height: '100%' }}>
				<RenderRoute math='121' name='000' />
				<Switch>
					<Route path='/admin/login' component={LoginIndex} />
					<Route path='/admin' component={homeIndex} />
				</Switch>
			</div>
		)
	}
}

export default withRouter(AdminIndex)
