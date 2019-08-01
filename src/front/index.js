import React from 'react'
import IHeader from './frame/iHeader/index'
import Home from './home/index'
import AboutMe from './aboutMe/index'
import ArticleInfo from './articleInfo/index.js'
import { Route, Switch } from 'react-router-dom'
import { CurrentCircle, Circle } from '../utils/canvas'
import { withRouter } from 'react-router-dom'

class FrontIndex extends React.Component {
	componentDidMount() {
		let canvas = document.getElementById('canvas')
		console.log(canvas)

		window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame

		let ctx = canvas.getContext('2d')
		let w, h
		w = canvas.width = canvas.offsetWidth
		h = canvas.height = canvas.offsetHeight
		let circles = []
		let current_circle = new CurrentCircle(0, 0)

		let draw = function() {
			ctx.clearRect(0, 0, w, h)
			for (let i = 0; i < circles.length; i++) {
				circles[i].move(w, h)
				circles[i].drawCircle(ctx)
				for (let j = i + 1; j < circles.length; j++) {
					circles[i].drawLine(ctx, circles[j])
				}
			}
			if (current_circle.x) {
				current_circle.drawCircle(ctx)
				for (var k = 1; k < circles.length; k++) {
					current_circle.drawLine(ctx, circles[k])
				}
			}
			requestAnimationFrame(draw)
		}

		let init = num => {
			for (let i = 0; i < num; i++) {
				circles.push(new Circle(Math.random() * w, Math.random() * h))
			}
			draw()
		}

		window.addEventListener('load', init(120))
	}
	render() {
		return (
			<div style={{ height: '100%' }}>
				<IHeader />
				<Switch>
					<Route path='/front/index' component={Home} />
					<Route path='/front/aboutme' component={AboutMe} />
					<Route path='/front/article' component={ArticleInfo} />
				</Switch>
				<canvas id='canvas' style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', height: '100%', zIndex: '-1' }} />
			</div>
		)
	}
}

export default withRouter(FrontIndex)
