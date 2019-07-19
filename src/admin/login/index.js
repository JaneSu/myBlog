import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../../action'
import PropTypes from 'prop-types'

import { Input } from 'antd'
import { Button } from 'antd'
import fontDesc_2 from '../../images/1563504753_762569.png'
import fontDesc_1 from '../../images/1563504772_136526.png'
import './index.scss'

class Login extends Component {
	constructor(props) {
		super(props)
		this.submit = this.submit.bind(this)
	}

	submit() {
		this.props.history.push()
		this.props.onClick()
	}
	render() {
		return (
			<div className='login-bg-img'>
				<div className='login-box'>
					<h1>登录</h1>
					<Input placeholder='请输入用户名' className='input' />
					<Input placeholder='请输入密码' className='input' type='password' />
					<Button type='primary' className='button-submit' onClick={this.submit}>
						确定
					</Button>
				</div>
				<div className='font-desc'>
					<img src={fontDesc_1} style={{ marginLeft: '.3rem', marginBottom: '.1rem' }} />
					<img src={fontDesc_2} />
				</div>
			</div>
		)
	}
}

Login.propTypes = {
	loginType: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
	loginType: state.loginType
})

const mapDispatchToProps = dispatch => ({
	onClick: () => dispatch(login('true'))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login)

// export default Login
