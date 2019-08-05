import React from 'react'
import MdEditor from 'react-markdown-editor-lite'
import MarkdownIt from 'markdown-it'
import './index.scss'
import { Button, message } from 'antd'
import axios from '../../../utils/axios'

import PropTypes from 'prop-types'
class AboutUs extends React.Component {
	constructor(props) {
		super(props)
		this.mdParser = new MarkdownIt({ menu: false, md: false })

		this.state = {
			mainBody: ''
		}
	}

	handleChange(value) {
		this.setState({
			mainBody: value.text
		})
	}
	// 保存
	save() {
		axios('/setting/update', {
			data: {
				id: this.props.id,
				mainBody: this.state.mainBody
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
			<div>
				<MdEditor
					value={this.state.mainBody}
					renderHTML={text => this.mdParser.render(text)}
					config={{
						view: {
							menu: true,
							md: true,
							html: true
						}
					}}
					onChange={e => this.handleChange(e)}
				/>
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
