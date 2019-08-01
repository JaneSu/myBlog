import React from 'react'
import { withRouter } from 'react-router-dom'
import SModal from '../../components/sModal'
import axios from '../../../utils/axios'
import { Table, Divider, Tag, Button, Modal } from 'antd'
const { confirm } = Modal

class CategoryIndex extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			columns: [
				{
					title: '名称',
					dataIndex: 'label'
				},

				{
					title: '状态',
					dataIndex: 'online',
					render: (text, record) => {
						return <span>{text ? '已启用' : '已停用'}</span>
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
									{text.online ? '停用' : '启用'}
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
			pageSize: 10,
			modalVisible: false, // 模态框是否显示
			categoryId: '', // 编辑时缓存的分类id
			modalOptions: {
				title: '分类',
				url: '/category/',
				options: [
					{
						label: '名称',
						type: 'text',
						key: 'label',
						rules: [{ required: true, message: '请填写名称' }]
					}
				]
			}
		}

		this.emit = this.emit.bind(this)
	}
	/**
	 * @description 打开编辑模态框
	 * @param {*} id
	 * @memberof ArticleIndex
	 */
	toEditor(id) {
		this.setState({
			categoryId: id
		})

		setTimeout(() => {
			this.setState({
				modalVisible: true
			})
		}, 200)
	}

	/**
	 * @description 子组件返回的信息
	 * @param {*} value
	 * @memberof CategoryIndex
	 */
	emit(value, type) {
		this.setState({
			modalVisible: value
		})
		if (type) {
			this.getList()
		}
	}

	componentWillMount() {
		this.getList()
	}
	// 获取列表
	getList() {
		axios('/category/list', {
			method: 'get'
		}).then(res => {
			this.setState({
				tableList: res.data
			})
		})
	}
	render() {
		let { modalVisible, modalOptions, categoryId } = this.state
		return (
			<div>
				<div>
					<section className='handler-area'>
						<Button type='primary' onClick={e => this.toEditor()}>
							新增
						</Button>
					</section>
					<section className='list-contain'>
						<Table columns={this.state.columns} dataSource={this.state.tableList} pagination={{ pageSize: this.state.pageSize, showSizeChanger: true, defaultCurrent: this.state.pageIndex, total: this.state.total }} />
					</section>
					<SModal visible={modalVisible} id={categoryId} options={modalOptions.options} title={modalOptions.title} url={modalOptions.url} emit={this.emit} />
				</div>
			</div>
		)
	}
}

export default withRouter(CategoryIndex)
