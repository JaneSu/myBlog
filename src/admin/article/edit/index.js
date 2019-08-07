import React from 'react'
import './index.scss'
// import Editor from 'for-editor'
import MdEditor from 'react-markdown-editor-lite'
import MarkdownIt from 'markdown-it'
import axios from '../../../utils/axios'
import { withRouter } from 'react-router-dom'

import { Input, Form, Select, Button, Upload, Icon, message } from 'antd'
const { Option } = Select

function getBase64(img, callback) {
	const reader = new FileReader()
	reader.addEventListener('load', () => callback(reader.result))
	reader.readAsDataURL(img)
}

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
			categoryList: [],
			loading: false,
			imageUrl: '',
			qiniuToken: ''
		}

		this.uploadImage = this.uploadImage.bind(this)
	}

	componentDidMount() {
		let params = new URLSearchParams(this.props.history.location.search)
		let id = params.get('id')

		if (id) {
			// 编辑文章
			this.getArticleInfo(id)
		}
	}
	beforeUpload(file, FileList) {
		console.log(file, FileList)
		return new Promise((resolve, reject) => {
			const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
			if (!isJpgOrPng) {
				message.error('You can only upload JPG/PNG file!')
			}
			const isLt2M = file.size / 1024 / 1024 < 2
			if (!isLt2M) {
				message.error('Image must smaller than 2MB!')
			}
			axios('/upload', {
				method: 'get'
			}).then(res => {
				console.log(res)
				this.setState({
					qiniuToken: res.data
				})
				setTimeout(() => {
					resolve()
				}, 200)
			})
		})
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
				categoryId: data.categoryId,
				id: data._id,
				imageUrl: data.image
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

	uploadImage(info) {
		if (info.file.status === 'uploading') {
			this.setState({ loading: true })
			return
		}
		if (info.file.status === 'done') {
			console.log(info)
			// Get this url from response in real world.
			getBase64(info.file.originFileObj, imageUrl =>
				this.setState({
					imageUrl,
					loading: false
				})
			)
			return info.file.response.hash
		}
	}

	/**
	 * @description 提交数据
	 * @memberof ArticleEdit
	 */
	emitArticle() {
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (err) return
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
		const uploadButton = (
			<div>
				<Icon type={this.state.loading ? 'loading' : 'plus'} />
				<div className='ant-upload-text'>Upload</div>
			</div>
		)

		const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form
		const { imageUrl } = this.state
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
							initialValue: this.state.categoryId || '',
							rules: [{ type: 'string', required: true, message: '请输入分类' }]
						})(
							<Select style={{ width: '40%' }} placeholder='选择分类'>
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
					<Form.Item label='题图'>
						{getFieldDecorator('image', {
							initialValue: this.state.imageUrl ? this.state.imageUrl : '',
							getValueFromEvent: this.uploadImage,

							rules: [{ type: 'string', required: true, message: '请选择图片' }],
							normalize: this.normalizeImage
						})(
							<Upload name='file' listType='picture-card' data={{ token: this.state.qiniuToken }} showUploadList={false} action='http://up-z2.qiniup.com' beforeUpload={this.beforeUpload.bind(this)}>
								{imageUrl ? <img src={imageUrl} alt='avatar' style={{ width: '100%' }} /> : uploadButton}
							</Upload>
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
