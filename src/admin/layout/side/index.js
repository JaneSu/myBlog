import React from 'react'
import './index.scss'
import { Menu, Icon } from 'antd'
import { withRouter } from 'react-router-dom'

const MENU_Array = new Map([
	[
		'article',
		{
			title: '文章管理',
			path: '/admin/article/index',
			key: 'article',
			filter: 'article'
		}
	],
	[
		'category',
		{
			title: '类目管理',
			path: '/admin/category/index',
			key: 'category',
			filter: 'category'
		}
	],
	[
		'setting',
		{
			title: '系统设置',
			path: '/admin/setting/index',
			key: 'setting',
			filter: 'setting'
		}
	]
])

class PageSide extends React.Component {
	constructor(props) {
		super(props)
		const { pathname } = props.location

		this.state = {
			defaultSelectedKeys: [this.getMapKey(pathname)]
		}
	}

	/**
	 * @description 跳转到相应页面
	 * @param {*} { item, key, keyPath, domEvent }
	 * @memberof PageSide
	 */
	goToPage({ item, key, keyPath, domEvent }) {
		this.props.history.push(MENU_Array.get(key)['path'])
	}

	getMapKey(location) {
		for (let [k, v] of MENU_Array) {
			if (location.indexOf(v.filter) !== -1) {
				return k
			}
		}
	}

	render() {
		const nodeItem = []
		MENU_Array.forEach((value, key) => {
			nodeItem.push(
				<Menu.Item key={value.key}>
					<Icon type='pie-chart' />
					<span>{value.title}</span>
				</Menu.Item>
			)
		})

		const { defaultSelectedKeys } = this.state

		return (
			<div className='sider-page'>
				<Menu mode='inline' defaultSelectedKeys={defaultSelectedKeys} style={{ height: '100%', borderRight: 0 }} onClick={({ item, key, keyPath, domEvent }) => this.goToPage({ item, key, keyPath, domEvent })}>
					{nodeItem}
				</Menu>
			</div>
		)
	}
}
export default withRouter(PageSide)
