import React from 'react'
import { Link } from 'react-router-dom'
import config from '../../../config'
import './index.scss'

class IHeader extends React.Component {
	render() {
		return (
			<header className="website-header">
				<div className="website-name">{config.website_name}</div>
				<div className="website-navbar">
					<Link to="/front/home">首页</Link>
					<Link to="/front/aboutme">关于我</Link>
				</div>
			</header>
		)
	}
}
export default IHeader
