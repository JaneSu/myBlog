import React from 'react'
import Head from '../layout/head/index'
import Side from '../layout/side/index'
import Main from '../layout/main/index'

import { Layout } from 'antd'
const { Header, Content, Sider } = Layout

export default function HomeIndex(props) {
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
					<Main />
				</Content>
			</Layout>
		</Layout>
	)
}
