// components/trainVadio/trainVadio.js
Component({
	options: {
		multipleSlots: true
	},
	/**
	 * 组件的属性列表
	 */
	properties: {
		tabArrays: {
			type: Array
		},
		videoArray: {
			type: Array,
			value: []
		},
		type: {
			type: String
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		q_yjz: true,
		q_videoIndex: '0',
		textArrayFlag: true,
		collectionFlag: true,
		giveFlag: true,
		jiazai: false,
		dyAry: [],
		teacherSrc: '../../images/index/teacherImage.png'
	},
	observers: {
		'videoArray': function (val) {
			if (val.length <= 0) return
		}
	},

	ready() {},

	/**
	 * 组件的方法列表
	 */
	methods: {
		teacherFns(e) {
			if (wx.getStorageSync('userInfo')) {
				let obj = {}
				obj.id = e.currentTarget.dataset.courid.toString()
				obj.courseType = '5'

				obj.courseWxType = e.currentTarget.dataset.item.course_type
				obj.wxId = e.currentTarget.dataset.item.id

				obj.adminToken = wx.getStorageSync('userInfo').remember_token
				obj.user_id = wx.getStorageSync('userInfo').id
				obj.school_id = wx.getStorageSync('userInfo').school_id
				let items = encodeURIComponent(JSON.stringify(obj))
				wx.navigateTo({
					url: '../link/link?items=' + items,
				})
			} else {
				wx.showToast({
					title: '请先登录!',
					icon: 'none'
				});
			}
		},


		teacherFn() {
			wx.navigateTo({
				url: '../planner/index',
			})
		},
		collectionFn(e) {
			let that = this;
			wx.ajax({
				url: 'api/dnx/sub',
				method: 'POST',
				data: {
					user_id: wx.getStorageSync('userInfo').id,
					status: e.currentTarget.dataset.item.userInfo.status == '0' ? 1 : 0,
					collect_id: e.currentTarget.dataset.item.collect_id
				},
				success: function (res) {
					let oIndex = e.currentTarget.dataset.index;
					let array = that.data.videoArray;
					array.forEach((item, index) => {
						if (index == oIndex) {
							let sItem = "videoArray[" + index + "].userInfo.status";
							that.setData({
								[sItem]: item.userInfo.status == '0' ? '1' : '0'
							})
						}
					})
				},
				fail: function (err) {
					wx.showToast({
						title: '登录后才可以哦!',
						icon: 'none'
					});
				}
			})
		},

		giveFn(e) {
			let that = this;
			wx.ajax({
				url: 'api/dnx/praise',
				method: 'GET',
				data: {
					user_id: wx.getStorageSync('userInfo').id,
					praise: e.currentTarget.dataset.item.userInfo.praise == '0' ? '1' : '0',
					collect_id: e.currentTarget.dataset.item.collect_id
				},
				success: function (res) {
					let oIndex = e.currentTarget.dataset.index;
					let array = that.data.videoArray;
					array.forEach((item, index) => {
						if (index == oIndex) {
							let sItem = "videoArray[" + index + "].userInfo.praise";
							that.setData({
								[sItem]: item.userInfo.praise == '0' ? '1' : '0'
							})
						}
					})

				},
				fail: function (err) {
					wx.showToast({
						title: '登录后才可以哦!',
						icon: 'none'
					});
				}
			})
		},


		shareFn(e) {
			this.triggerEvent('myevent', e)
		},



		// tabs切换
		tabsChange(e) {
			this.setData({
				textArrayFlag: !e.currentTarget.dataset.textarrayflag
			})
		},
		//动态更新当前视频下标
		q_swiperBindchange: function (e) {
			this.setData({
				q_videoIndex: e.detail.current
			})
			// 当加载的视频还剩1个未被滑到时加载下一页
			if (e.detail.current + 1 >= this.data.videoArray.length) {
				// this.q_yjzVideos(this.data.type) //预加载视频
				// let a = {
				// 	type: this.data.type,
				// 	current: e.detail.current,
				// 	leght: this.data.videoArray.length
				// }
			}
		},
		_transition(e) {
			let dy = e.detail.dy;
			//如果到底部还继续往下拉，这弹出提示框
			if (dy == 0 && this.data.dyAry[this.data.dyAry.length - 1] > 0) {
				this.data.dyAry = [];
				this.triggerEvent('myeventType', this.data.type)
			}
			this.data.dyAry.push(dy)
		},

		//预加载视频
		q_yjzVideos: function (course_type) {

		},
		bindtimeupdateFn(e) {
			wx.ajax({
				url: 'api/dnx/addHistory',
				data: {
					user_id: wx.getStorageSync('userInfo').id,
					top_id: '0', // 资讯id
					course_id: e.currentTarget.dataset.item.collect_id //课堂id
				},
				method: 'POST',
				success: function (res) {
				},
				fail: function (err) {
					console.log(err)
				}
			})
		}
	},
})