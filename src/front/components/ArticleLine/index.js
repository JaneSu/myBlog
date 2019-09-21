import React from 'react'
import './index.scss'
import ArrowRight from '../../../images/arrow-right.png'
import { withRouter } from 'react-router-dom'
function ArticleLine(props) {
	const { title, date, main, label, id, desc, image, readCount } = props

	const labelStr = label.reduce((all, item) => {
		return all + item
	})

	let _date = date.replace(/\d+:\d+/, '')

	const gotoInfo = () => {
		props.history.push('/front/article?id=' + id)
	}
	return (
		<div className='article-line'>
			<div className='article-line-title' onClick={gotoInfo}>
				{title}
			</div>

			<div className='article-line-info'>
				<div className='date'>{_date}</div>
				<div className='label'>分类：{labelStr}</div>
				<div className='count'>阅读数：{readCount}</div>
			</div>
			<div className='image-contain'>
				<img src={image} alt='' />
			</div>
			<div className='article-line-main' dangerouslySetInnerHTML={{ __html: desc }} />
			<div className='more' onClick={gotoInfo}>
				查看更多
				<img src={ArrowRight} style={{ width: '0.1rem', height: '.13rem' }} />
			</div>
		</div>
	)
}

export default withRouter(ArticleLine)
