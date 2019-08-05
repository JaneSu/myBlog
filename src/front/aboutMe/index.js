import React from 'react'

import axios from '../../utils/axios'
import MdEditor from 'react-markdown-editor-lite'
import MarkdownIt from 'markdown-it'
import './index.scss'
class AboutMe extends React.Component {
	constructor(props) {
		super(props)

		this.mdParser = new MarkdownIt({ menu: false, md: false })
		this.mdEditor = null

		this.state = {
			mainBody: ''
		}
	}
	getData() {
		axios('/setting/front/tab/5d43aa6cc7c1e635a77458d2', {
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
		const { mainBody } = this.state
		return (
			<div className='front-home-page'>
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
			</div>
		)
	}
}

export default AboutMe
