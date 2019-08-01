import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

import CategoryList from './list'
// import ArticleEdit from './edit'

function CategoryMain({ match }) {
	return (
		<Switch>
			<Route exact path={match.path} component={CategoryList} />
			<Route path={match.path + '/index'} component={CategoryList} />
			<Route path={match.path + '/edit'} component={CategoryList} />
		</Switch>
	)
}

export default withRouter(CategoryMain)
