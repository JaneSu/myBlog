import React from 'react'
import { connect } from 'react-redux'
import config from '../../../config'
import PropTypes from 'prop-types'

import './index.scss'

class AdminHead extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className='admin-head'>
				<h1 className='title'>{config.website_name}</h1>
				<span>退出登录</span>
			</div>
		)
	}
}

AdminHead.propTypes = {}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AdminHead)
