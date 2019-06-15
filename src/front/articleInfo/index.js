import React from 'react'
import axios from '../../utils/axios'
import './index.scss'

class ArticleInfo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			main: '',
			title: '',
			date: '',
			label: ''
		}
	}
	componentWillMount() {
		axios('/article/index').then(({ main, title, date, label }) => {
			this.setState({
				main,
				title,
				date,
				label
			})
		})
	}

	render() {
		return (
			<div className="container">
				<article className="article-info">
					<h1 className="article-title">{this.state.title}</h1>
					<section className="information">
						<span className="date">创建时间：{this.state.date}</span>
						<span className="label">分类：{this.state.label}</span>
					</section>
					<main className="article-main">{this.state.main}</main>
				</article>
				<div className="page">
					<p className="pre">
						上一篇：<span>123</span>
					</p>
					<p className="next">
						下一篇：<span>123</span>
					</p>
				</div>
			</div>
		)
	}
}

export default ArticleInfo
