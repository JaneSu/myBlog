import { combineReducers } from 'redux'
import loginInfo from './login'
import { createStore } from 'redux'

export default createStore(combineReducers({ loginInfo }))
