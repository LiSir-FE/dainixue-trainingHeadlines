// components/dialog/dialog.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: { //此处是接收页面传过来的值
		visible: { //弹框开关,visible类型设值type，visible的值为false（默认）当页面传过来值会改变
			type: Boolean,
			value: false
		},
		width: {
			type: Number,
			value: 85
		},
		position: {
			type: String,
			value: 'center'
		},
		title: { //标题
			type: String,
			value: ''
		},

		showClose: { //图片是否显示，没有路径时也不显示
			type: Boolean,
			value: true
		},
		img: { //图片路径
			type: String,
			value: ''
		},
		showFooter: { //确定取消是否显示
			type: Boolean,
			value: false
		},
		color: { //确定文字的颜色
			type: String,
			value: 'red'
		},
	},

	/**
	 * 组件的初始数据
	 */
	data: {

	},
	options: {
		multipleSlots: true //在组件定义里的选项中启用多slot支持
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		clickMask() { //点击clickMask弹窗外面时关闭隐藏
			this.setData({
				visible: false
			})
		},
		close() {
			this.setData({
				visible: false
			})
		},
		close() { //点击取消按扭关闭隐藏，并传值到B页面
			this.setData({
				visible: false
			});
			this.triggerEvent('cancel', 0);
		},
		confirm() { //点击确定按扭关闭隐藏，并传值到B页面
			this.setData({
				visible: false
			});
			this.triggerEvent('confirm', 1);
		}
	}
})