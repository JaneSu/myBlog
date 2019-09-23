import React from 'react'
import MK from '../../../components/mk'

import './index.scss'
import { Button, message } from 'antd'
import axios from '../../../utils/axios'

import PropTypes from 'prop-types'
class AboutUs extends React.Component {
	constructor(props) {
		super(props)
		// this.mdParser = new MarkdownIt({ menu: false, md: false })

		this.state = {
			mainBody: '',
			mainBodyHtml: ''
		}
	}

	handleChange(value) {
		this.setState({
			mainBody: value.text,
			mainBodyHtml: value.html
		})
	}
	// 保存
	save() {
		axios('/setting/update', {
			data: {
				id: this.props.id,
				mainBody: this.state.mainBody,
				mainBodyHtml: this.state.mainBodyHtml
			}
		}).then(res => {
			message.info(res.msg)
		})
	}

	// 获取数据
	getData() {
		axios('/setting/tab/' + this.props.id, {
			method: 'get'
		}).then(res => {
			this.setState({
				mainBody: res.data.aboutMe
			})
		})
	}

	componentWillMount() {
		this.getData()
	}
	render() {
		return (
			<div className='about-me'>
				<MK
					content={this.state.mainBody}
					config={{
						view: {
							menu: true,
							md: true,
							html: true
						}
					}}
					changeHandle={this.handleChange.bind(this)}
				></MK>

				<Button type='primary' className='primary_button' onClick={this.save.bind(this)}>
					保存
				</Button>
			</div>
		)
	}
}

AboutUs.propTypes = {
	id: PropTypes.string.isRequired
}

AboutUs.defaultProps = {}

export default AboutUs
