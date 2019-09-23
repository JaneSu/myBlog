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
		this.getList()
	}
	getList() {
		axios('/article/front/index', {
			method: 'get',
			data: {
				nowPage: this.state.pageIndex,
				pageSize: this.state.pageSize
			}
		}).then(({ data: { list, total } }) => {
			this.setState({
				list: list,
				total
			})
		})
	}

	onChange(pagination, filters, sorter) {
		debugger

		this.setState(
			{
				pageIndex: pagination
			},
			this.getList
		)
	}

	render() {
		const list = this.state.list || []
		return (
			<div className='front-home-page'>
				<section className='main-part'>
					{list.map(item => {
						return <ArticleLine title={item.title} date={item.createTime} label={[item.category]} main={item.mainBody} id={item._id} desc={item.desc} image={item.image} readCount={item.readCount} />
					})}
				</section>
				<section className='page-contain'>
					<Pagination defaultCurrent={this.state.pageIndex} total={this.state.total} onChange={this.onChange.bind(this)} />
				</section>
			</div>
		)
	}
}

export default withRouter(Home)
