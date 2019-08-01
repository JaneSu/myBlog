import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import ArticleMain from '../article'
import CategoryMain from '../category'
import Head from '../layout/head/index'
import Side from '../layout/side/index'
import Summary from '../summary'
import './index.scss'
import { connect } from 'react-redux'
import { login } from '../../action/index'
import { Layout, message } from 'antd'
import PropTypes from 'prop-types'
import Cookie from 'js-cookie'
import { dispatch } from 'rxjs/internal/observable/pairs'

const { Header, Content, Sider } = Layout

// function HomeIndex({ match }) {}
class HomeIndex extends React.Component {
	constructor(props) {
		super(props)
	}
	componentWillMount() {
		const { token } = this.props
		if (!token && !Cookie.get('token')) {
			message.warn('尚未登录')
			this.props.history.push('/admin/login')
		} else {
			let token = Cookie.get('token')
			this.props.login(token)
		}
	}
	render() {
		const { match } = this.props
		return (
			<Layout style={{ height: '100%' }}>
				<Header>
					<Head />
				</Header>
				<Layout>
					<Sider>
						<Side />
					</Sider>
					<Content>
						<div className='main-container'>
							<Switch>
								<Route exact path={match.path} component={Summary} />
								<Route path={match.path + '/article'} component={ArticleMain} />
								<Route path={match.path + '/category'} component={CategoryMain} />
							</Switch>
						</div>
					</Content>
				</Layout>
			</Layout>
		)
	}
}

HomeIndex.propTypes = {
	token: PropTypes.string.isRequired
}
const mapStateToProps = state => ({
	token: state.loginInfo.token
})

const mapDispatchToProps = dispatch => ({
	login: token => {
		dispatch(login(token))
	}
})

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(HomeIndex)
)
