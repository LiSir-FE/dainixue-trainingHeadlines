// miniprogram/pages/classRoom/index.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		id: wx.getStorageSync('userInfo').id,
		bookInfo: [], // 书籍信息
		isShow: false,
		h5Flag: false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
	},

	// 登录
	login() {
		wx.navigateTo({
		  url: '../login/index',
		})
	},

	// 获取课堂列表
	getOrderList(id) {
		let that = this;
		that.setData({
			isShow: false
		})
		wx.ajax({
			url: 'api/dnx/order',
			data: {
				user_id: wx.getStorageSync('userInfo').id,
				page: 1
			},
			method: 'GET',
			success: function (res) {
				that.setData({
					isShow: true,
					bookInfo: res.data.data.buy.length >= 1 ? res.data.data.buy : res.data.data.recommendList,
					h5Flag: res.data.data.buy.length >= 1 ? true : false
				})
			},
			fail: function (err) {
				console.log(err)
			}
		})
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
		this.getOrderList(this.data.id)
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