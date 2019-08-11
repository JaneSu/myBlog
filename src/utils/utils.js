/**
 * @description 将图片文件转换成base64
 * @param {*} img   上传的图片文件
 * @param {*} cb    需要操作的回调函数
 */
function fileToBase64(img, cb) {
	let file = new FileReader()
	file.addEventListener('load', () => cb(file.result))
	file.readAsDataURL(img)
}

export default {
	fileToBase64
}
