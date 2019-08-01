import React from 'react'
import './index.scss'
// import Editor from 'for-editor'
import MdEditor from 'react-markdown-editor-lite'
import MarkdownIt from 'markdown-it'
import axios from '../../../utils/axios'
import { withRouter } from 'react-router-dom'

import { Input, Form, Select, Button } from 'antd'
const { Option } = Select

class ArticleEdit extends React.Component {
	constructor(props) {
		super(props)
		this.mdParser = new MarkdownIt({ menu: false, md: false })
		this.mdEditor = null
		this.state = {
			mainBody: '',
			id: '',
			title: '',
			category: [],
			categoryList: []
		}
	}

	componentDidMount() {
		let params = new URLSearchParams(this.props.history.location.search)
		let id = params.get('id')

		if (id) {
			// 编辑文章
			this.getArticleInfo(id)
		}
	}

	componentWillMount() {
		this.getCategoryList()
	}
	/**
	 * @description 获取文章详情
	 * @param {*} id  文章id
	 * @memberof ArticleEdit
	 */
	getArticleInfo(id) {
		axios('/article/info', {
			method: 'get',
			data: {
				id: id
			}
		}).then(({ data }) => {
			this.setState({
				title: data.title,
				mainBody: data.mainBody,
				category: data.category,
				id: data._id
			})
		})
	}
	handleChange(value) {
		this.setState({
			mainBody: value.text
		})
	}

	inputValue(e, type) {
		this.setState({
			[type]: e.currentTarget.value
		})
	}

	// 获取分类列表
	getCategoryList() {
		axios('/category/list', {
			method: 'get',
			data: {
				pageIndex: 1,
				pageSize: 10
			}
		}).then(res => {
			this.setState({
				categoryList: [...res.data]
			})
		})
	}

	/**
	 * @description 提交数据
	 * @memberof ArticleEdit
	 */
	emitArticle() {
		this.props.form.validateFieldsAndScroll((err, values) => {
			let url = '/article/add'
			let desc = this.mdEditor.getHtmlValue()

			// 截取一部分作为简介保存，减少数据量
			let descArr = desc.split('\n')
			desc = ''

			for (let i = 0; i < descArr.length; i++) {
				if (i > 6) break
				desc = desc + descArr[i] + '\n'
			}

			let data = {
				// title: this.state.title,
				// category: this.props.form.getFieldsValue()['category'],
				...values,
				mainBody: this.state.mainBody,
				desc
			}
			if (this.state.id) {
				url = '/article/update'
				data.id = this.state.id
			}
			axios(url, {
				data
			}).then(res => {
				console.log(res)
				this.cancelEditor()
			})
		})
	}

	/**
	 * @description 取消编辑
	 * @memberof ArticleEdit
	 */
	cancelEditor() {
		this.props.history.push('/admin/article/index')
	}

	render() {
		const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form
		return (
			<div className='article-edit-contain'>
				<Form labelCol={{ span: 1 }}>
					<Form.Item label='标题'>
						{getFieldDecorator('title', {
							initialValue: this.state.title ? this.state.title : '',
							rules: [{ type: 'string', required: true, message: '请输入标题' }]
						})(<Input placeholder='请输入标题' className='input-title' onBlur={e => this.inputValue(e, 'title')} />)}
					</Form.Item>
					<Form.Item label='分类'>
						{getFieldDecorator('category', {
							initialValue: this.state.category.length !== 0 ? this.state.category : [],
							rules: [{ type: 'array', required: true, message: '请输入分类' }]
						})(
							<Select mode='multiple' style={{ width: '40%' }} placeholder='Please select'>
								{this.state.categoryList.map((item, index) => {
									return (
										<Option key={index} value={item._id}>
											{item.label}
										</Option>
									)
								})}
							</Select>
						)}
					</Form.Item>
					<Form.Item label='内容'>
						<MdEditor
							ref={node => (this.mdEditor = node)}
							value={this.state.mainBody}
							renderHTML={text => this.mdParser.render(text)}
							config={{
								view: {
									menu: true,
									md: true,
									html: true
								}
							}}
							onChange={e => this.handleChange(e)}
						/>
						{/* <Editor value={this.state.mainBody} onChange={e => this.handleChange(e)} /> */}
					</Form.Item>
					<Form.Item>
						<div style={{ textAlign: 'center' }}>
							<Button
								type='primary'
								style={{ marginRight: '.1rem' }}
								onClick={() => {
									this.emitArticle()
								}}
							>
								保存
							</Button>
							<Button type='' onClick={() => this.cancelEditor()}>
								取消
							</Button>
						</div>
					</Form.Item>
				</Form>
			</div>
		)
	}
}

export default withRouter(Form.create({ name: 'article_edit' })(ArticleEdit))
