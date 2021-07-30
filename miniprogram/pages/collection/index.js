// miniprogram/pages/collection/index.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		bookInfo: [],// 书籍信息
		userId: wx.getStorageSync('userInfo').id
	},


	// 请求我的收藏
	getTopList() {
		let that = this;
		wx.ajax({
			url: 'api/dnx/collect',
			data: {
				page: 1,
				limit: 10,
				user_id: wx.getStorageSync('userInfo').id
			},
			method: 'POST',
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

	onLowerTap() { // 下拉加在更多
	},


	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getTopList()
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