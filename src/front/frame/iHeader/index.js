import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import config from '../../../config'
import './index.scss'

class IHeader extends React.Component {
	constructor(props) {
		super(props)
		// this.props = props
	}

	render() {
		return (
			<header className='website-header'>
				<div className='website-name'>{config.website_name}</div>
				<div className='website-navbar'>
					<NavLink to='/front/index' activeClassName='active' className='nav-tab'>
						首页
					</NavLink>
					<NavLink to='/front/aboutme' activeClassName='active' className='nav-tab'>
						关于我
					</NavLink>
				</div>
			</header>
		)
	}
}
export default withRouter(IHeader)
