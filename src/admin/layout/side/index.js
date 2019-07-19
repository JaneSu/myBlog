import React from 'react'
import './index.scss'
import { Menu, Icon } from 'antd'
import { withRouter } from 'react-router-dom'

class PageSide extends React.Component {
	constructor(props) {
		super(props)
		// this.goToPage = this.goToPage.call(this)
	}

	goToPage({ item, key, keyPath, domEvent }) {
		switch (key) {
			case 'article':
				this.props.push('/admin/article/index')
				break
		}
	}
	render() {
		return (
			<div className="sider-page">
				<Menu
					mode="inline"
					defaultSelectedKeys={['article']}
					style={{ height: '100%', borderRight: 0 }}
					onClick={({ item, key, keyPath, domEvent }) => this.goToPage({ item, key, keyPath, domEvent })}
				>
					<Menu.Item key="article">
						<Icon type="pie-chart" />
						<span>文章管理</span>
					</Menu.Item>
				</Menu>
			</div>
		)
	}
}
export default withRouter(PageSide)
