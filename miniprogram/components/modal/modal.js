// components/modal/modal.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		visible:{  //弹框开关,visible类型设值type，visible的值为false（默认）当页面传过来值会改变
			type:Boolean,   
			value:false
		  },
		  modalArray: {
			  type: Array
		  }
	},

	/**
	 * 组件的初始数据
	 */
	data: {

	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		modalClickFn() {
			this.setData({visible:false})
		},
		modalItemFn(e) {
			this.triggerEvent('myevent', e.currentTarget.dataset.index)
		}
	}
})
