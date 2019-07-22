import React from 'react'
import LoginIndex from './login/index'
import homeIndex from './home/index'
import RenderRoute from '../components/renderRoute'

import { Route, Switch } from 'react-router-dom'

class AdminIndex extends React.Component {
	render() {
		return (
			<div className='admin-container' style={{ height: '100%' }}>
				<RenderRoute math='121' name='000' />
				<Switch>
					<Route path='/admin/login' component={LoginIndex} />
					<Route path='/admin/' component={homeIndex} />
				</Switch>
			</div>
		)
	}
}

export default AdminIndex
