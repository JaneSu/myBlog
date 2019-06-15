import axios from 'axios'

const instance = axios.create({
	baseURL: ' https://easy-mock.com/mock/5d0502a1bc72966b65143a2b/blog',
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
		return Promise.resolve(res.data.data)
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
