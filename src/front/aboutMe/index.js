import React from 'react'
// import MK from '../../components/mk'
import MK from '@/components/mk'
import axios from '../../utils/axios'
import './index.scss'
class AboutMe extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			mainBody: ''
		}
	}
	getData() {
		axios('/setting/front/tab/5d43aa6cc7c1e635a77458d2', {
			method: 'get'
		}).then(res => {
			this.setState({
				mainBody: res.data.aboutMeHtml
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
				<MK
					content={this.state.mainBody}
					config={{
						view: {
							menu: false,
							md: false,
							html: true
						}
					}}
					isEdit={false}
				></MK>
			</div>
		)
	}
}

export default AboutMe
