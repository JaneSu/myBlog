import React from 'react'
import './index.scss'
import ArrowRight from '../../../images/arrow-right.png'
import { withRouter } from 'react-router-dom'
function ArticleLine(props) {
	const { title, date, main, label } = props

	const labelStr = label.reduce((all, item) => {
		return all + item
	})

	const gotoInfo = id => {
		props.history.push('/front/article')
	}
	return (
		<div className="article-line">
			<div className="article-line-title">{title}</div>
			<div className="article-line-info">
				<div className="date">{date}</div>
				<div className="label">分类：{labelStr}</div>
			</div>
			<div className="article-line-main">{main}</div>
			<div className="more" onClick={gotoInfo}>
				查看更多
				<img src={ArrowRight} style={{ width: '0.1rem', height: '.13rem' }} />
			</div>
		</div>
	)
}

export default withRouter(ArticleLine)
