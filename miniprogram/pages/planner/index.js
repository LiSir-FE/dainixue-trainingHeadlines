// miniprogram/pages/planner/index.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		plannerDetails: '../../images/index/planner-details.jpeg',
		isvIP: '59.9',
		jiage: '1680'
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},

	// 确认报名
	signUp() {
		if (wx.getStorageSync('userInfo')) {
			let obj = {}
			obj.userInfo = wx.getStorageSync('userInfo')
			obj.adminToken = wx.getStorageSync('userInfo').remember_token
			obj.user_id = wx.getStorageSync('userInfo').id
			obj.school_id = wx.getStorageSync('userInfo').school_id
			// console.log(encodeURIComponent(JSON.stringify(obj)))
			let items = encodeURIComponent(JSON.stringify(obj))
			wx.navigateTo({
				url: '../link/link?items=' + items,
			})
		} else {
			wx.showToast({
				title: '请先登录!'
			});
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
	onShareAppMessage: function () {

	}
})