// miniprogram/pages/InformationDetails/index.js
var app = getApp()
var WxParse = require('../../wxParse/wxParse.js')
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		id: '',
		top_id: '',
		course_id: '',
		details: [],
		info: {}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		if(options.top_id) {
			this.setData({
				top_id: options.top_id
			})
		}
		if(options.course_id) {
			this.setData({
				course_id: options.course_id
			})
		}
		this.setData({
			id: options.top_id ? options.top_id :  options.course_id
		})
	},

	// 获取详情
	getTop(id) {
		let that = this;
		wx.ajax({
			url: 'api/top/getTop',
			data: {
				id: id
			},
			method: 'GET',
			success: function (res) {
				var article = res.data.data.content
				WxParse.wxParse('article', 'html', article, that, 5)
				that.setData({
					info: res.data.data,
					details: res.data.data
				})
			},
			fail: function (err) {
				console.log(err)
			}
		})
	},

	bindInputBlur(e) {
		this.inputValue = e.detail.value
	},
	bindPlayVideo() {
		console.log('1')
		this.videoContext.play()
	},

	videoErrorCallback(e) {
		console.log('视频错误信息:')
		console.log(e.detail.errMsg)
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
		this.videoContext = wx.createVideoContext('myVideo')
	},

	// 添加历史记录
	addHistory(top_id, course_id) {
		wx.ajax({
			url: 'api/dnx/addHistory',
			data: {
				user_id: wx.getStorageSync('userInfo').id,
				top_id: top_id, // 资讯id
				course_id: course_id //课堂id
			},
			method: 'POST',
			success: function (res) {
				console.log('添加历史记录成功', res.data.data)
			},
			fail: function (err) {
				console.log(err)
			}
		})
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		this.getTop(this.data.id)
		this.addHistory(this.data.top_id, this.data.course_id)
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