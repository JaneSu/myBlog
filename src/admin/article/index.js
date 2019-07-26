import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

import ArticleIndex from './list'
import ArticleEdit from './edit'

function ArticleMain({ match }) {
	return (
		<Switch>
			<Route exact path={match.path} component={ArticleIndex} />
			<Route path={match.path + '/index'} component={ArticleIndex} />
			<Route path={match.path + '/edit'} component={ArticleEdit} />
		</Switch>
	)
}

export default withRouter(ArticleMain)
