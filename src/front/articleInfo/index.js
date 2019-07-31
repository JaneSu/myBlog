import React from 'react'
import axios from '../../utils/axios'
import { withRouter } from 'react-router-dom'
import './index.scss'
import MdEditor from 'react-markdown-editor-lite'
import MarkdownIt from 'markdown-it'

class ArticleInfo extends React.Component {
	constructor(props) {
		super(props)
		this.mdParser = new MarkdownIt({ menu: false, md: false })
		this.mdEditor = null
		this.state = {
			mainBody: '',
			title: '',
			createTime: '',
			category: ''
		}
	}
	componentWillMount() {
		let params = new URLSearchParams(this.props.history.location.search)
		let id = params.get('id')
		axios('/article/front/info', {
			method: 'get',
			data: {
				id
			}
		}).then(({ data: { mainBody, category, createTime, title } }) => {
			this.setState({
				mainBody,
				title,
				createTime,
				category
			})
		})
	}

	render() {
		const { mainBody } = this.state

		return (
			<div className='container'>
				<article className='article-info'>
					<h1 className='article-title'>{this.state.title}</h1>
					<section className='information'>
						<span className='date'>创建时间：{this.state.createTime}</span>
						<span className='label'>分类：{this.state.category}</span>
					</section>
					<main className='article-main'>
						<MdEditor
							ref={node => (this.mdEditor = node)}
							value={mainBody}
							renderHTML={text => this.mdParser.render(text)}
							config={{
								view: {
									menu: false,
									md: false,
									html: true
								}
							}}
						/>
					</main>
				</article>
				<div className='page'>
					<p className='pre'>
						上一篇：<span>123</span>
					</p>
					<p className='next'>
						下一篇：<span>123</span>
					</p>
				</div>
			</div>
		)
	}
}

export default withRouter(ArticleInfo)
