// components/tabs/tabs.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		tabArray: {
			type: Array
		},
		type: {
			type: String,
			value: ''
		},
		color: {
			type: String,
			value: ''
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
	},


	onLoad() {
		
	},





	/**
	 * 组件的方法列表
	 */
	methods: {
		tabsChange: function (event) {
			const id = event.currentTarget.dataset.id;
			this.setData({
				id: id,
				type: id
			});
			this.triggerEvent('myevent', id)
		}
	}
})