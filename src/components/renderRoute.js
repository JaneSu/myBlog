import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
// import routesConfig from '../config/router'

// function findSubRoute(name) {
// 	let routeIndex = routesConfig.findIndex(item => item.name === name)
// 	if (routeIndex === -1) return console.log('route path is not found')

// 	return routesConfig[routeIndex]['children'].map(item => {
// 		return <Route path={item.path} />
// 	})
// }

function RenderRoute(...a) {
	debugger
	return (
		<Switch>
			<Route />
		</Switch>
	)
}

export default withRouter(RenderRoute)
