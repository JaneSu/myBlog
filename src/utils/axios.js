import axios from 'axios'
import { message } from 'antd'

const instance = axios.create({
	// baseURL: ' https://easy-mock.com/mock/5d0502a1bc72966b65143a2b/blog',
	baseURL: 'http://127.0.0.1:3000/api',
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
		if (responseData.code !== 200) {
			message.error(responseData.msg)
		}
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
