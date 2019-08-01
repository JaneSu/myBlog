import { deflate } from 'zlib'

export class Circle {
	/**
	 * Creates an instance of Circle.
	 * @param {any} x 圆的x坐标
	 * @param {any} y 圆的y坐标
	 * @memberof Circle
	 */
	constructor(x, y) {
		this.x = x
		this.y = y
		this.r = Math.random() * 10 //圆的半径
		this._mx = Math.random() //圆在x轴上移动的距离
		this._my = Math.random() //圆在y轴上移动的距离
	}

	/**
	 *
	 *
	 * @param {any} ctx canvas的2d上下文对象
	 * @memberof Circle
	 */
	drawCircle(ctx) {
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false)
		ctx.closePath()
		ctx.fillStyle = 'rgba(204, 204, 204, 0.3)'
		ctx.fill()
	}

	drawLine(ctx, _circle) {
		let dx = this.x - _circle.x // 两个圆心在x轴上的距离
		let dy = this.y - _circle.y // 两个圆心在y轴上的距离
		let d = Math.sqrt(dx * dx + dy * dy) // 利用三角函数计算出两个圆心之间的距离
		if (d < 150) {
			ctx.beginPath()
			ctx.moveTo(this.x, this.y) // 线的起点
			ctx.lineTo(_circle.x, _circle.y) // 线的终点
			ctx.closePath()
			ctx.strokeStyle = 'rgba(204, 204, 204, 0.3)'
			ctx.stroke()
		}
	}

	/**
	 * 圆在界面内的移动距离
	 *
	 * @param {any} w 屏幕的宽度
	 * @param {any} h 屏幕的高度
	 * @memberof Circle
	 */
	move(w, h) {
		this._mx = this.x < w && this.x > 0 ? this._mx : -this._mx
		this._my = this.y < h && this.y > 0 ? this._my : -this._my
		this.x += this._mx / 2
		this.y += this._my / 2
	}
}

//鼠标点画圆闪烁变动
export class CurrentCircle extends Circle {
	constructor(x, y) {
		super(x, y)
	}

	drawCircle(ctx) {
		ctx.beginPath()
		// this.r = (this.r < 14 && this.r > 1) ? (this.r + (Math.random() * 2 - 1)) : 2
		this.r = 8
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false)
		ctx.fillStyle = 'rgba(255, 77, 54, 0.6)'
		ctx.fill()
	}
}
