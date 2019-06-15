import React from 'react'
import ArticleLine from '../components/ArticleLine/index.js'
import { Pagination } from 'antd'
import axios from '../../utils/axios'
import './index.scss'
class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = { list: [] }
	}
	componentWillMount() {
		axios('/article/list').then(({ list }) => {
			this.setState({
				list: list
			})
		})
	}
	onChange(page) {
		console.log(page)
		debugger
	}
	render() {
		const list = this.state.list || []
		return (
			<div className="front-home-page">
				<section className="main-part">
					{list.map(item => {
						return <ArticleLine title={item.title} date={item.date} label={[item.label]} main={item.main} />
					})}
				</section>
				<section className="page-contain">
					<Pagination defaultCurrent={1} total={50} onChange={this.onChange} />
				</section>
			</div>
		)
	}
}

export default Home
