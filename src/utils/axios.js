import axios from 'axios'
import { message } from 'antd'

import store from '../reducer/index'
import { BrowserRouter } from 'react-router-dom'
const router = new BrowserRouter()

const instance = axios.create({
	// baseURL: 'http://127.0.0.1:3000/api',
	baseURL: 'http://fatearia.com/api',
	// baseURL: 'http://47.107.40.124/api',
	timeout: 10000,
	headers: {}
})

instance.interceptors.request.use(
	config => {
		let state = store.getState()
		const { url, headers } = config
		if (!/\/front\//.test(url)) {
			console.log(state.loginInfo.token)
			headers['token'] = state.loginInfo.token
		}
		return config
	},
	err => {
		return Promise.reject(err)
	}
)

instance.interceptors.response.use(
	res => {
		let responseData = res.data

		switch (responseData.code) {
			case 3010:
				// 无效的token
				message.error(responseData.msg)
				setTimeout(() => {
					window.location.href = '/admin/login'
				}, 2000)
				break
			case 5000:
				// 系统错误
				message.error(responseData.msg)
				break
		}

		return Promise.resolve(responseData)
	},
	err => {
		return Promise.reject(err)
	}
)

export default (url, { method = 'post', data = {} } = {}) => {
	let params = {}

	if (method === 'post') {
		params.data = data
	} else if (method === 'get') {
		params.params = data
	}

	return instance({
		url,
		method: method,
		...params
	})
}
