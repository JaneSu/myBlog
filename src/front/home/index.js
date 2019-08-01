import React from 'react'
import ArticleLine from '../components/ArticleLine/index.js'
import { Pagination } from 'antd'
import axios from '../../utils/axios'
import { withRouter } from 'react-router-dom'
import './index.scss'
class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			list: [],
			pageIndex: 1,
			pageSize: 10,
			total: 0
		}
	}
	componentWillMount() {
		axios('/article/front/index', {
			method: 'get',
			params: {
				nowPage: 1,
				pageSize: this.state.pageSize
			}
		}).then(({ data: { list, total } }) => {
			this.setState({
				list: list,
				total
			})
		})
	}
	onChange(page) {
		console.log(page)
	}
	render() {
		const list = this.state.list || []
		return (
			<div className='front-home-page'>
				<section className='main-part'>
					{list.map(item => {
						return <ArticleLine title={item.title} date={item.createTime} label={[item.category]} main={item.mainBody} id={item._id} desc={item.desc} />
					})}
				</section>
				<section className='page-contain'>
					<Pagination defaultCurrent={this.pageIndex} total={this.state.total} onChange={this.onChange} />
				</section>
			</div>
		)
	}
}

export default withRouter(Home)
