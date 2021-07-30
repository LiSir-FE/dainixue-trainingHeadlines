// components/realTimeInfo/realTimeInfo.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		textArray: {
			type: Array
		},
		hidden: {
			type: Boolean
		},
		pageNo: {
			type: String
		},
		pageSize: {
			type: String
		},
		scrollY: {
			type: Boolean
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		nullPage: '../../images/index/nullOrder.png',
		scrollHeight: 0,
		scrollTop: 0,
	},

	ready() {
		let that = this;
		// wx.getSystemInfo({
		// 	success: (result) => {
		// 		that.setData({
		// 			scrollHeight: result.windowHeight - 50
		// 		})
		// 	},
		// })
	},

	onLoad() {},

	/**
	 * 组件的方法列表
	 */
	methods: {
		bindDownLoad() {
			this.triggerEvent('mybindDownLoad', 'xia')
		},
		topLoad() {
			this.triggerEvent('mytopLoad', 'shang')
		},
		scroll(e) {
			if (this.data.scrollY) {
				this.setData({
					scrollTop: e.detail.scrollTop
				})
			}
		}
	}
})