import React from 'react'
import IHeader from './frame/iHeader/index'
import Home from './home/index'
import AboutMe from './aboutMe/index'
import ArticleInfo from './articleInfo/index.js'
import { Route, Switch } from 'react-router-dom'

class FrontIndex extends React.Component {
	render() {
		return (
			<div style={{ height: '100%' }}>
				<IHeader />
				<Switch>
					<Route path='/front/index' component={Home} />
					<Route path='/front/aboutme' component={AboutMe} />
					<Route path='/front/article' component={ArticleInfo} />
				</Switch>
			</div>
		)
	}
}

export default FrontIndex
