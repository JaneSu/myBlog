import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'antd/dist/antd.css'
import './utils/rem.js'

import * as serviceWorker from './serviceWorker'
import App from './App'

// import { Provider } from 'react-redux'

ReactDOM.render(
	// <Provider>
	<App />,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
