import axios from 'axios'
import { message } from 'antd'

import { BrowserRouter } from 'react-router-dom'
const router = new BrowserRouter()
const instance = axios.create({
	// baseURL: ' https://easy-mock.com/mock/5d0502a1bc72966b65143a2b/blog',
	// baseURL: 'http://127.0.0.1:3000/api',
	// baseURL: 'http://fatearia.com:3000/api',
	baseURL: 'http://47.107.40.124/api',
	timeout: 1000,
	headers: {}
})

instance.interceptors.request.use(
	config => {
		return config
	},
	err => {
		return Promise.reject(err)
	}
)

instance.interceptors.response.use(
	res => {
		let responseData = res.data
		console.log()
		switch (responseData.code) {
			case 2010:
				message.error(responseData.msg)
				setTimeout(() => {
					window.location.href = '/admin/login'
				}, 1000)
				break
		}
		// if (responseData.code !== 200) {
		// 	message.error(responseData.msg)
		// }
		return Promise.resolve(responseData)
	},
	err => {
		return Promise.reject(err)
	}
)

export default (url, params) => {
	return instance({
		url,
		method: 'post',
		...params
	})
}
