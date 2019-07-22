import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ArticleIndex from '../../article/list'
import ArticleEdit from '../../article/edit'

import './index.scss'

class MainIndex extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<div className="main-container">
				<Switch>
					<Route path="/admin/article/index" component={ArticleIndex} />
					<Route path="/admin/article/edit" component={ArticleEdit} />
				</Switch>
			</div>
		)
	}
}

export default MainIndex
