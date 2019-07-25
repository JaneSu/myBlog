const loginInfo = (state = { token: '' }, action) => {
	debugger
	switch (action.type) {
		case 'LOGIN':
			return { ...state, token: action.token }
		default:
			return state
	}
}

export default loginInfo
