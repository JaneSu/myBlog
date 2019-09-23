import React from 'react'
import MdEditor from 'react-markdown-editor-lite'
import MarkdownIt from 'markdown-it'
import PropTypes from 'prop-types'

class MK extends React.Component {
	constructor(props) {
		super(props)

		this.mdParser = new MarkdownIt({ menu: false, md: false })
		this.mdEditor = null
	}

	render() {
		const { content, config, changeHandle, isEdit } = this.props

		let renderModal

		if (isEdit) {
			renderModal = <MdEditor ref={node => (this.mdEditor = node)} value={content} renderHTML={text => this.mdParser.render(text)} config={config} onChange={changeHandle} />
		} else {
			renderModal = <MdEditor.HtmlRender ref={node => (this.mdEditor = node)} html={content} config={config} />
		}
		return <div className='markDownContainer'>{renderModal}</div>
	}
}

MK.propTypes = {
	// 内容
	content: PropTypes.string.isRequired,
	// 是否显示编辑栏目
	isEdit: PropTypes.bool.isRequired,
	height: PropTypes.string,
	config: PropTypes.object.isRequired
}

MK.defaultProps = {
	isEdit: true,
	height: '4rem',
	config: {
		view: {
			menu: true,
			md: true,
			html: true
		}
	}
}

export default MK
