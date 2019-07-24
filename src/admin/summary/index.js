import React, { Component } from 'react'
import './index.scss'

import { Card } from 'antd'

class Summary extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className='summary'>
				<Card size='small' title='文章数量' style={{ width: 300 }} headStyle={{ textAlign: 'center', padding: '.1rem 0' }} bodyStyle={{ textAlign: 'center', padding: '.5rem 0', fontSize: '.3rem', color: '#048DFF' }}>
					123
				</Card>
			</div>
		)
	}
}

export default Summary
