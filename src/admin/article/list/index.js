import React from 'react'
import './index.scss'
import { withRouter } from 'react-router-dom'

import { Table, Divider, Tag, Button } from 'antd'

class ArticleIndex extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			columns: [
				{
					title: '标题',
					dataIndex: 'title'
				},
				{
					title: '创建时间',
					dataIndex: 'createTime'
				},
				{
					title: '分类',
					dataIndex: 'category'
				},

				{
					title: '操作',
					key: 'opt',
					render: (text, record) => (
						<div>
							<Button type="primary" style={{ marginRight: '.2rem' }} onClick={e => this.toEditor('1')}>
								编辑
							</Button>
							<Button type="primary">下线</Button>
						</div>
					)
				}
			],
			data: [
				{
					title: '测试文章',
					createTime: '2019-10-10',
					category: '通用'
				}
			]
		}
	}

	toEditor(id) {
		if (id) {
			// 编辑旧文章
			this.props.history.push('/admin/article/edit?id=' + id)
		} else {
			// 新文章
			this.props.history.push('/admin/article/edit')
		}
	}

	render() {
		return (
			<div>
				<section className="handler-area">
					<Button type="primary" onClick={e => this.toEditor()}>
						新增
					</Button>
				</section>
				<section className="list-contain">
					<Table columns={this.state.columns} dataSource={this.state.data} pagination={{ pageSize: 10, showSizeChanger: true }} />
				</section>
			</div>
		)
	}
}

export default withRouter(ArticleIndex)
