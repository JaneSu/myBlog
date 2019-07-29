import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../../action'
import PropTypes from 'prop-types'
import axios from '../../utils/axios'
import Cookie from 'js-cookie'

import { Input, notification, Button, message } from 'antd'
import fontDesc_2 from '../../images/1563504753_762569.png'
import fontDesc_1 from '../../images/1563504772_136526.png'
import './index.scss'

class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			account: '',
			password: ''
		}
		this.submit = this.submit.bind(this)
	}

	submit() {
		const { password, account } = this.state
		if (!password || !account) {
			return message.warning('请填写用户名和密码')
		}
		axios('/login', {
			data: {
				account,
				password
			}
		}).then(res => {
			if (res.code === 200) {
				message.info('登录成功')
				Cookie.set('token', res.data.token, { expires: 32 })
				this.props.onClick(res.data.token)
				this.props.history.push('/admin/')
			}
		})
	}
	insetData(type, e) {
		let value = e.currentTarget.value
		this.setState({
			[type]: value
		})
	}
	render() {
		return (
			<div className='login-bg-img'>
				<div className='login-box'>
					<h1>登录</h1>
					<Input
						placeholder='请输入用户名'
						className='input'
						onBlur={e => {
							this.insetData('account', e)
						}}
					/>
					<Input
						placeholder='请输入密码'
						className='input'
						type='password'
						onBlur={e => {
							this.insetData('password', e)
						}}
					/>
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
	token: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
	token: state.loginInfo.token
})

const mapDispatchToProps = dispatch => ({
	onClick: token => dispatch(login(token))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login)

// export default Login
