import React from 'react'
import './index.scss'
import { withRouter } from 'react-router-dom'
import axios from '../../../utils/axios'
import { Table, Divider, Tag, Button, Modal } from 'antd'
const { confirm } = Modal

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
					title: '分类',
					dataIndex: 'category'
				},
				{
					title: '状态',
					dataIndex: 'online',
					render: (text, record) => {
						return <span>{text ? '已上线' : '已下线'}</span>
					}
				},
				{
					title: '创建时间',
					dataIndex: 'createTime'
				},

				{
					title: '操作',
					key: 'opt',
					render: (text, record) => {
						return (
							<div>
								<Button type='primary' style={{ marginRight: '.2rem' }} onClick={e => this.toEditor(text._id)}>
									编辑
								</Button>
								<Button type='' style={{ marginRight: '.2rem' }} onClick={e => this.changeStatus(text._id, text.online)}>
									{text.online ? '下线' : '上线'}
								</Button>
								<Button type='danger' onClick={e => this.deleteArticle(text._id)}>
									删除
								</Button>
							</div>
						)
					}
				}
			],
			tableList: [],
			total: 0,
			pageIndex: 1,
			pageSize: 10
		}
	}

	/**
	 * @description 删除文章
	 * @param {number} [id=0]
	 * @memberof ArticleIndex
	 */
	deleteArticle(id = 0) {
		confirm({
			title: '确认要删除该文章么',
			okText: '删除',
			okType: 'danger',
			cancelText: '取消',
			onOk() {
				axios('/article/delete', {
					data: {
						id
					}
				}).then(({ data }) => {
					this.getList()
				})
			},
			onCancel() {}
		})
	}

	/**
	 * @description 改变文章状态
	 * @param {number} [id=0]          文章id
	 * @param {boolean} [status=true]  当前的文章状态
	 * @memberof ArticleIndex
	 */
	changeStatus(id = 0, status = true) {
		axios('/article/update', {
			data: {
				id,
				online: !status
			}
		}).then(({ data }) => {
			this.getList()
		})
	}

	/**
	 * @description 前往编辑页面
	 * @param {*} id
	 * @memberof ArticleIndex
	 */
	toEditor(id) {
		if (id) {
			// 编辑旧文章
			this.props.history.push('/admin/article/edit?id=' + id)
		} else {
			// 新文章
			this.props.history.push('/admin/article/edit')
		}
	}

	/**
	 * @description 获取列表数据
	 * @memberof ArticleIndex
	 */
	getList() {
		axios('/article/index', {
			method: 'get',
			data: {
				nowPage: this.state.pageIndex,
				pageSize: this.state.pageSize
			}
		}).then(({ data: { list, count } }) => {
			this.setState({
				tableList: list
			})
			// console.log(res)
		})
	}

	componentWillMount() {
		this.getList()
	}

	render() {
		return (
			<div>
				<section className='handler-area'>
					<Button type='primary' onClick={e => this.toEditor()}>
						新增
					</Button>
				</section>
				<section className='list-contain'>
					<Table columns={this.state.columns} dataSource={this.state.tableList} pagination={{ pageSize: this.state.pageSize, showSizeChanger: true, defaultCurrent: this.state.pageIndex, total: this.state.total }} />
				</section>
			</div>
		)
	}
}

export default withRouter(ArticleIndex)
