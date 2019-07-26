import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import ArticleMain from '../article'
import Head from '../layout/head/index'
import Side from '../layout/side/index'
import Summary from '../summary'
import './index.scss'
import { Layout } from 'antd'
const { Header, Content, Sider } = Layout

function HomeIndex({ match }) {
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
						</Switch>
					</div>
				</Content>
			</Layout>
		</Layout>
	)
}

export default withRouter(HomeIndex)
