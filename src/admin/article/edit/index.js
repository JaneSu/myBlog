import React from 'react'
import './index.scss'
// import Editor from 'for-editor'
import MdEditor from 'react-markdown-editor-lite'
import MarkdownIt from 'markdown-it'
import axios from '../../../utils/axios'
import { withRouter } from 'react-router-dom'
import utils from '../../../utils/utils'
import SModal from '../../components/sModal'
import { Input, Form, Select, Button, Upload, Icon, message } from 'antd'
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
			categoryList: [],
			loading: false,
			imageUrl: '',
			qiniuToken: '',
			modalVisible: false, // 控制显示添加类别
			modalOptions: {
				title: '新增分类',
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

		this.uploadImage = this.uploadImage.bind(this)
		this.inputMarkDown = this.inputMarkDown.bind(this)
		this.addNewCategory = this.addNewCategory.bind(this)
		this.fallbackModal = this.fallbackModal.bind(this)
	}

	componentDidMount() {
		let params = new URLSearchParams(this.props.history.location.search)
		let id = params.get('id')

		if (id) {
			// 编辑文章
			this.getArticleInfo(id)
		}
	}

	/**
	 * @description 图片上传之前的操作函数
	 * @param {*} file 当前上传的文件
	 * @param {*} FileList	文件列表
	 * @returns
	 * @memberof ArticleEdit
	 */
	beforeUpload(file, FileList) {
		return new Promise((resolve, reject) => {
			const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
			if (!isJpgOrPng) {
				message.error('文件格式不正确')
			}
			const isLt2M = file.size / 1024 / 1024 < 4
			if (!isLt2M) {
				message.error('图片大小不能超过4M')
			}
			// 上传之前清空当前的图片
			this.setState({
				imageUrl: ''
			})
			axios('/upload', {
				method: 'get'
			}).then(res => {
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
	 * @description 上传图片的操作
	 * @param {*} info 上传信息
	 * @returns
	 * @memberof ArticleEdit
	 */
	uploadImage(info) {
		switch (info.file.status) {
			case 'uploading':
				this.setState({ loading: true })
				return
			case 'done':
				utils.fileToBase64(info.file.originFileObj, imageUrl =>
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
				...values,
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

	// 自定义markdown编辑器的输出
	inputMarkDown(e) {
		return e.text
	}

	// 添加新的标签
	addNewCategory() {
		this.setState({
			modalVisible: true
		})
	}

	/**
	 * @description 子组件返回的信息
	 * @param {*} value
	 * @memberof CategoryIndex
	 */
	fallbackModal(value, type) {
		this.setState({
			modalVisible: value
		})
		if (type) {
			this.getCategoryList()
		}
	}

	render() {
		const uploadButton = (
			<div>
				<Icon type={this.state.loading ? 'loading' : 'plus'} />
				<div className='ant-upload-text'>Upload</div>
			</div>
		)

		const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form
		const { imageUrl, modalVisible, modalOptions } = this.state
		return (
			<div className='article-edit-contain'>
				<Form labelCol={{ span: 1 }}>
					<Form.Item label='标题'>
						{getFieldDecorator('title', {
							initialValue: this.state.title ? this.state.title : '',
							rules: [{ type: 'string', required: true, message: '请输入标题' }]
						})(<Input placeholder='请输入标题' className='input-title' />)}
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
						<Button className='new-category' onClick={this.addNewCategory}>
							添加分类
						</Button>
					</Form.Item>
					<Form.Item label='题图'>
						{getFieldDecorator('image', {
							initialValue: this.state.imageUrl ? this.state.imageUrl : '',
							getValueFromEvent: this.uploadImage,
							rules: [{ type: 'string', required: true, message: '请选择图片' }]
						})(
							<Upload name='file' listType='picture-card' data={{ token: this.state.qiniuToken }} showUploadList={false} action='http://up-z2.qiniup.com' beforeUpload={this.beforeUpload.bind(this)}>
								{imageUrl ? <img src={imageUrl} alt='avatar' style={{ width: '100%' }} /> : uploadButton}
							</Upload>
						)}
					</Form.Item>
					<Form.Item label='内容'>
						{getFieldDecorator('mainBody', {
							initialValue: this.state.mainBody ? this.state.mainBody : '',
							getValueFromEvent: this.inputMarkDown,
							rules: [{ type: 'string', required: true, message: '输入内容' }]
						})(
							<MdEditor
								ref={node => (this.mdEditor = node)}
								renderHTML={text => this.mdParser.render(text)}
								config={{
									view: {
										menu: true,
										md: true,
										html: true
									}
								}}
							/>
						)}
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
				<SModal visible={modalVisible} options={modalOptions.options} title={modalOptions.title} url={modalOptions.url} emit={this.fallbackModal} />
			</div>
		)
	}
}

export default withRouter(Form.create({ name: 'article_edit' })(ArticleEdit))
