const loginType = (state = 'false', action) => {
	switch (action.type) {
		case 'LOGIN':
			return action.loginType
		default:
			return state
	}
}

export default loginType
