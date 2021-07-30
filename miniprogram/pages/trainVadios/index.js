// miniprogram/pages/trainVadios/index.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		id: '1',
		courseType: '1',
		isShow: false,
		tabArrays: [],
		videoArrays: [],
		hidden: false
	},
	// tabs切换
	tabsChange(e) {
		this.setData({
			id: e.detail,
		})
		this.getRecommendDetail(e.detail)
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			id: options.id,
			courseType: options.courseType
		})
		this.getRecommendDetail(options.courseType, options.id, wx.getStorageSync('userInfo').id)
		this.getMenus()
	},

	// 请求导航信息
	getMenus() {
		let that = this;
		wx.ajax({
			url: 'api/dnx/menus',
			method: 'GET',
			success: function (res) {
				that.setData({
					tabArrays: res.data.data,
				})
			},
			fail: function (err) {
				console.log(err)
			}
		})
	},

	// 获取视频
	getRecommendDetail(courseType, id, user_id) {
		let that = this;
		that.setData({
			isShow: false,
			hidden: false
		})
		wx.ajax({
			url: 'api/sub/scroll',
			data: {
				course_type: courseType,
				id: id ? id : '',
				user_id: user_id ? user_id : ''
			},
			method: 'GET',
			success: function (res) {
				that.setData({
					videoArrays: res.data.data,
				})
				setTimeout(() => {
					that.setData({
						isShow: true,
						hidden: true
					})
				}, 100);
			},
			fail: function (err) {
				console.log(err)
			}
		})
	},

	// myeventType
	myeventType(e) {
		if (e.detail == 1) {
			this.setData({
				id: 2
			})
			this.getRecommendDetail(2, this.data.id, wx.getStorageSync('userInfo').id)
		} else if (e.detail == 2) {
			this.setData({
				id: 3
			})
			this.getRecommendDetail(3, this.data.id, wx.getStorageSync('userInfo').id)
		} else {
			this.setData({
				id: 1
			})
			this.getRecommendDetail(1, this.data.id, wx.getStorageSync('userInfo').id)
		}
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function (e) {
		return {
			title: '带你学科技',
			path: '/pages/index/index'
		}
	}
})