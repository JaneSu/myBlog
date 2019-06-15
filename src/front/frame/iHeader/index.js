import React from 'react'
import { Link } from 'react-router-dom'

class IHeader extends React.Component {
	render() {
		return (
			<header>
				<div className="website-name">青青子衿</div>
				<div className="website-navbar">
					<Link to="/front/home">首页</Link>
					<Link to="/front/aboutme">关于我</Link>
				</div>
			</header>
		)
	}
}
export default IHeader
