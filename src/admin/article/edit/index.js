import React from 'react'
import './index.scss'
import Editor from 'for-editor'
import axios from '../../../utils/axios'
import { withRouter } from 'react-router-dom'

import { Input, Form, Select, Button } from 'antd'
const { Option } = Select

class ArticleEdit extends React.Component {
	state = {
		mainBody: ''
	}
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		let params = new URLSearchParams(this.props.history.location.search)
	}

	handleChange(value) {
		this.setState({
			mainBody: value
		})
	}

	inputValue(e, type) {
		this.setState({
			[type]: e.currentTarget.value
		})
	}

	/**
	 * @description 提交数据
	 * @memberof ArticleEdit
	 */
	emitArticle() {
		axios('/article/add', {
			data: {
				title: this.state.title,
				category: ['测试分类'],
				mainBody: this.state.mainBody
			}
		}).then(res => {
			console.log(res)
			this.cancelEditor()
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
							rules: [{ type: 'string', required: true, message: '请输入标题' }]
						})(<Input placeholder='请输入标题' className='input-title' onBlur={e => this.inputValue(e, 'title')} />)}
					</Form.Item>
					<Form.Item label='分类'>
						{getFieldDecorator('category', {
							rules: [{ type: 'string', required: true, message: '请输入分类' }]
						})(
							<Select mode='multiple' style={{ width: '40%' }} placeholder='Please select'>
								{[]}
							</Select>
						)}
					</Form.Item>
					<Form.Item label='内容'>
						<Editor value={this.state.mainBody} onChange={e => this.handleChange(e)} />
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
