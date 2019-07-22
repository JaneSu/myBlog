import React from 'react'
import './index.scss'
import Editor from 'for-editor'
import { withRouter } from 'react-router-dom'

import { Input, Form, Select, Button } from 'antd'
const { Option } = Select

class ArticleEdit extends React.Component {
	state = {
		value: ''
	}
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		console.log(this.props.history.location.search)
		let params = new URLSearchParams(this.props.history.location.search)
		console.log(params.get('id'))
		// To disabled submit button at the beginning.
		// this.props.form.validateFields()
	}

	handleChange(value) {
		this.setState({
			value
		})
	}

	cancelEditor() {
		this.props.history.push('/admin/article/index')
	}

	render() {
		const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form
		return (
			<div className="article-edit-contain">
				<Form labelCol={{ span: 1 }}>
					<Form.Item label="标题">
						{getFieldDecorator('title', {
							rules: [{ type: 'string', required: true, message: '请输入标题' }]
						})(<Input placeholder="请输入标题" className="input-title" />)}
					</Form.Item>
					<Form.Item label="分类">
						{getFieldDecorator('category', {
							rules: [{ type: 'string', required: true, message: '请输入标题' }]
						})(
							<Select mode="multiple" style={{ width: '40%' }} placeholder="Please select" defaultValue={['a10', 'c12']}>
								{[]}
							</Select>
						)}
					</Form.Item>
					<Form.Item label="内容">
						{getFieldDecorator('content', {
							rules: [{ required: true, message: '请输入标题' }]
						})(<Editor value={this.state.value} onChange={() => this.handleChange()} />)}
					</Form.Item>
					<Form.Item>
						<div style={{ textAlign: 'center' }}>
							<Button type="primary" style={{ marginRight: '.1rem' }}>
								保存
							</Button>
							<Button type="" onClick={() => this.cancelEditor()}>
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
