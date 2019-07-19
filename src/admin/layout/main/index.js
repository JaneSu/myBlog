import React from 'react'
import ArticleIndex from '../../article'

import './index.scss'

class MainIndex extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<div className="main-container">
				<ArticleIndex />
			</div>
		)
	}
}

export default MainIndex
