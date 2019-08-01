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
			category: '',
			pre: [],
			next: []
		}
	}
	componentWillMount() {
		let params = new URLSearchParams(this.props.history.location.search)
		let id = params.get('id')
		this.getInfo(id)
	}
	getInfo(id) {
		axios('/article/front/info', {
			method: 'get',
			data: {
				id
			}
		}).then(({ data: { mainBody, category, createTime, title, pre, next } }) => {
			this.setState({
				mainBody,
				title,
				createTime,
				category,
				pre,
				next
			})
		})
	}

	render() {
		const { mainBody, pre, next } = this.state
		let preNode = '',
			nextNode = ''
		if (pre.length) {
			preNode = (
				<p className='pre' onClick={this.getInfo.bind(this, pre[0]._id)}>
					上一篇：<span>{pre[0].title}</span>
				</p>
			)
		}
		if (next.length) {
			nextNode = (
				<p className='pre' onClick={this.getInfo.bind(this, next[0]._id)}>
					下一篇：<span>{next[0].title}</span>
				</p>
			)
		}

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
					{preNode}
					{nextNode}
				</div>
			</div>
		)
	}
}

export default withRouter(ArticleInfo)
