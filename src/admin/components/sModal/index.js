import React, { Component } from 'react'
import { Modal, Form, Input, message } from 'antd'
import axios from '../../../utils/axios'

import PropTypes from 'prop-types'

class SModal extends Component {
	constructor(props) {
		super(props)
		this.state = {
			confirmLoading: false,
			initialForm: {} // 编辑的默认值
		}
		this.cancel = this.cancel.bind(this)
		this.submit = this.submit.bind(this)
	}

	cancel() {
		this.props.emit(false)
	}

	submit() {
		if (this.props.url) {
			let url = this.props.url + (this.props.id ? 'update' : 'create')

			this.setState({
				confirmLoading: true
			})

			this.props.form.validateFieldsAndScroll((err, values) => {
				if (!err) {
					console.log('Received values of form: ', values)
				}

				let data = {
					...values
				}

				if (this.props.id) {
					data.id = this.props.id
				}

				axios(url, {
					data
				}).then(res => {
					if (!res.data) {
						this.setState({
							confirmLoading: false
						})
						return message.warn(res.msg)
					}
					this.setState({
						confirmLoading: false
					})
					this.props.emit(false, 'ok')
				})
			})
		} else {
			this.props.emit(false)
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.id && this.props.id !== nextProps.id) {
			let url = this.props.url + 'info'
			axios(url, {
				method: 'get',
				data: {
					id: nextProps.id
				}
			}).then(res => {
				debugger
				this.setState({
					initialForm: res.data
				})
			})
		}
	}

	render() {
		const { title, width, visible, options } = this.props
		const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form

		function returnComponents(item) {
			switch (item.type) {
				case 'text':
					return <Input placeholder={item.placeholder} style={{ width: item.width || '3rem' }} />
			}
		}
		return (
			<Modal okText='确认' title={title} width={width} closable={false} confirmLoading={this.state.confirmLoading} destroyOnClose={true} visible={visible} onCancel={this.cancel} onOk={this.submit}>
				<Form labelCol={{ span: 4, offset: 0 }}>
					{options.map((item, index) => {
						return (
							<Form.Item label={item.label} key={index}>
								{getFieldDecorator(item.key, {
									initialValue: this.state.initialForm[item.key] || '',
									rules: item.rules
								})(returnComponents(item))}
							</Form.Item>
						)
					})}
				</Form>
			</Modal>
		)
	}
}

SModal.propTypes = {
	options: PropTypes.array.isRequired, // 配置
	title: PropTypes.string.isRequired, // 标题
	width: PropTypes.string, // 宽度
	visible: PropTypes.bool.isRequired, // 是否显示
	url: PropTypes.string, // 请求的接口路径
	emit: PropTypes.func.isRequired, // 像父组件传递数据的方法
	id: PropTypes.string // 编辑时需要查询的id
}

SModal.defaultProps = {
	width: '45%',
	visible: false,
	options: [],
	id: ''
}

export default Form.create({ name: 'modal_form' })(SModal)
