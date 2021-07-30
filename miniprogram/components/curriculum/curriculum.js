// components/curriculum/curriculum.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		courseArray: {
			type: Array
		},
		stars: {
			type: Boolean
		},
		h5Flag: {
			type: Boolean
		},
		type: {
			type: String
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		nullPage: '../../images/index/nullOrder.png',
		roomPlay: '../../images/index/room-play.png',
		starsImg: '../../images/index/video-Collections.png',
		recommend: '../../images/index/recommend.png',
		id: wx.getStorageSync('userInfo').id ? true : false
	},


	bannerFn() {

	},

	ready() {
		this.setData({
			id: wx.getStorageSync('userInfo').id ? true : false
		})
	},

	/**
	 * 组件的方法列表
	 */
	methods: {

		bookFn(e) {
			if (!wx.getStorageSync('userInfo')) {
				wx.showToast({
					title: '请先登录',
					icon: 'loading'
				});
				setTimeout(() => {
					wx.navigateTo({
						url: '../../pages/login/index',
					})
				}, 800);
			} else {
				if (this.data.h5Flag) {
					let obj = {}
					obj.id = e.currentTarget.dataset.coursebasicid
					obj.userInfo = wx.getStorageSync('userInfo')
					obj.adminToken = wx.getStorageSync('userInfo').remember_token
					obj.user_id = wx.getStorageSync('userInfo').id
					obj.school_id = wx.getStorageSync('userInfo').school_id
					obj.type = this.data.type
					// console.log(encodeURIComponent(JSON.stringify(obj)))
					let items = encodeURIComponent(JSON.stringify(obj))
					wx.navigateTo({
						url: '../link/link?items=' + items,
					})
				} else {
					let obj = e.currentTarget.dataset
					wx.navigateTo({
						url: '../trainVadios/index?courseType=' + obj.coursetype + '&id=' + obj.id,
					})
				}
			}
		},
		login() {
			wx.navigateTo({
				url: '../../pages/login/index',
			})
		},
		serrView: function () {
			var myEventDetail = {} // detail对象，提供给事件监听函数
			var myEventOption = {} // 触发事件的选项
			this.triggerEvent('myevent', myEventDetail, myEventOption)
		}
	}
})