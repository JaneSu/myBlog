import React from 'react'
import IHeader from './frame/iHeader/index'
import Home from './home/index'
import AboutMe from './aboutMe/index'
import { Route, Switch } from 'react-router-dom'

class FrontIndex extends React.Component {
	render() {
		return (
			<div>
				<IHeader />
				<Switch>
					<Route path="/front/home" component={Home} />
					<Route path="/front/aboutme" component={AboutMe} />
					weishenme huizheayng
				</Switch>
			</div>
		)
	}
}

export default FrontIndex
