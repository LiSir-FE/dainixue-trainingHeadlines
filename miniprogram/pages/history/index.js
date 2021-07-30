// miniprogram/pages/history/index.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		active: 'a',
		type: '1',
		userId: wx.getStorageSync('userInfo').id,
		tabArrays: [{
				title: '课程',
				id: '1'
			},
			{
				title: '资讯',
				id: '2'
			}
		],
		textArrays: [],
		bookInfo: [],

		hidden: false,
		pageNo: 1,
		pageSize: 10
	},
	// tabs切换
	tabsChange(e) {
		this.setData({
			type: e.detail
		})
		if (e.detail == 1) {
			this.getCourse()
		} else {
			this.getHistory()
		}
	},
	// 浏览历史 咨询
	getHistory() {
		let that = this;
		wx.ajax({
			url: 'api/dnx/history',
			data: {
				user_id: wx.getStorageSync('userInfo').id
			},
			method: 'GET',
			success: function (res) {
				that.setData({
					textArrays: res.data.data,
				})
			},
			fail: function (err) {
				console.log(err)
			}
		})
	},
	// 历史记录 课程
	getCourse() {
		let that = this;
		wx.ajax({
			url: 'api/dnx/course',
			data: {
				user_id: wx.getStorageSync('userInfo').id
			},
			method: 'GET',
			success: function (res) {
				that.setData({
					bookInfo: res.data.data
				})
			},
			fail: function (err) {
				console.log(err)
			}
		})
	},
	mybindDownLoad(e) {
		console.log(e)
	},
	mytopLoad(e) {
		console.log(e)
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getCourse()
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
	onShareAppMessage: function () {

	}
})