import React from 'react'
import { withRouter } from 'react-router-dom'
import AboutUs from './aboutMe/index'
import axios from '../../utils/axios'
import { Tabs } from 'antd'
const { TabPane } = Tabs

class SettingIndex extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			tabList: [],
			activeKey: '' // 当前标签页的id
		}
	}

	componentWillMount() {
		this.getTabList()
	}

	// 获取标签列表
	getTabList() {
		axios('/setting/tab', {
			method: 'get'
		}).then(res => {
			this.setState({
				tabList: res.data
			})
		})
	}
	// 改变标签页
	changeTab(activeKey) {
		this.setState({
			activeKey
		})
	}

	render() {
		function getComponent(id) {
			switch (id) {
				case '5d43aa6cc7c1e635a77458d2':
					return <AboutUs id={id} />
			}
		}
		return (
			<div className='setting-container'>
				<Tabs defaultActiveKey='1' onChange={this.changeTab.bind(this)}>
					{this.state.tabList.map(item => {
						return (
							<TabPane tab={item.label} key={item.id}>
								{getComponent(item.id)}
							</TabPane>
						)
					})}
				</Tabs>
			</div>
		)
	}
}

export default withRouter(SettingIndex)
