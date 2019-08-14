import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import config from '../../../config'
import './index.scss'
import { Icon, Drawer } from 'antd'
class IHeader extends React.Component {
	constructor(props) {
		super(props)
		// this.props = props
		this.state = {
			drawerVisible: false
		}
	}

	// 显示侧边栏
	showDrawer() {
		this.setState({
			drawerVisible: true
		})
	}
	// 关闭侧边栏
	onClose() {
		this.setState({
			drawerVisible: false
		})
	}

	render() {
		return (
			<div>
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
				</header>{' '}
				<header className='website-header-phone'>
					<div className='website-name'>{config.website_name}</div>

					<Icon type='menu' style={{ color: '#fff' }} onClick={this.showDrawer.bind(this)} className='menu' />

					<Drawer title='导航' placement='right' closable={true} onClose={this.onClose.bind(this)} visible={this.state.drawerVisible} className='draw'>
						<div className='website-navbar'>
							<NavLink to='/front/index' activeClassName='active' className='nav-tab'>
								首页
							</NavLink>
							<NavLink to='/front/aboutme' activeClassName='active' className='nav-tab'>
								关于我
							</NavLink>
						</div>
					</Drawer>
				</header>
			</div>
		)
	}
}
export default withRouter(IHeader)
