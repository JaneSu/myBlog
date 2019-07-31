import React from 'react'
import { connect } from 'react-redux'
import config from '../../../config'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import './index.scss'
import { withRouter } from 'react-router-dom'

class AdminHead extends React.Component {
	constructor(props) {
		super(props)
	}

	goPage(type) {
		switch (type) {
			case 'home':
				this.props.history.push('/front/index')
		}
	}
	render() {
		return (
			<div className='admin-head'>
				<h1 className='title'>{config.website_name}</h1>
				<div>
					<Button
						type='primary'
						shape='circle'
						icon='home'
						style={{ marginRight: '.2rem' }}
						onClick={e => {
							this.goPage('home')
						}}
					/>
					<Button type='primary' shape='circle' icon='logout' />
				</div>
			</div>
		)
	}
}

AdminHead.propTypes = {}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(AdminHead)
)
