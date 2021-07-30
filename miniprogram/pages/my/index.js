// miniprogram/pages/my/index.js
import {
	Dialog
} from '../../miniprogram_npm/vant-weapp/dialog/dialog'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		storAge: wx.getStorageSync('userInfo'),
		defaultAvatar: wx.getStorageInfoSync('userInfo').avatar ? wx.getStorageInfoSync('userInfo').avatar : '../../images/index/defaultAvatar.png',
		userInfo: {},
		dataInfo: [ // 资料信息
			{
				icon: '../../images/index/me-order.png',
				title: '我的订单',
				url: '../orderList/index'
			},
			{
				icon: '../../images/index/me-collection.png',
				title: '我的收藏',
				url: '../collection/index'
			},
			{
				icon: '../../images/index/me-data.png',
				title: '个人资料',
				url: '../editInfo/index'
			},
			{
				icon: '../../images/index/me-record.png',
				title: '历史记录',
				url: '../history/index'
			},
		],
		cellInfo: [ // 单元格信息
			{
				icon: '../../images/index/me-aboutUs.png',
				title: '关于我们',
				url: '../aboutUs/index'
			},
			// {
			// 	icon: '../../images/index/me-downloads.png',
			// 	title: '下载APP客户端'
			// },
			{
				icon: '../../images/index/me-contact.png',
				title: '客服电话：010-53917782 18210306130'
			},
		],
		userInfoFlag: wx.getStorageSync('userInfo'),
		dialogVisible: false, // 弹框
		footerVisible: true, // 弹框确认 取消按钮
		color: '#FF5437' // 弹框确认按钮颜色
	},

	// 退出登录
	signOut() {
		let that = this;
		that.setData({
			dialogVisible: !that.data.dialogVisible
		})
	},

	// 弹框事件
	onLinke(e) {
		if (e.detail === 0) {
			console.log('取消')
			this.setData({
				dialogVisible: false
			});
			this.triggerEvent('cancel', 0);
		} else {
			this.setData({
				dialogVisible: false,
				storAge: '',
				defaultAvatar: '../../images/index/defaultAvatar.png'
			});
			wx.ajax({
				url: 'api/dnx/logout',
				data: {
					user_id: wx.getStorageSync('userInfo').id
				},
				method: 'GET',
				success: function (res) {
					this.triggerEvent('confirm', 1);
					console.log('确认')
					wx.clearStorage();
				},
				fail: function (err) {
					console.log(err)
				}
			})
		}
	},

	// 登录页面
	headerButton() {
		wx.navigateTo({
			url: '../login/index'
		})
	},

	// 信息跳转
	itemViewFn(e) {
		let that = this;
		let url = e.currentTarget.dataset.item.url
		if (url) {
			if (that.data.storAge) {
				wx.navigateTo({
					url: url + '?idx=' + e.detail.index,
				})
			} else {
				wx.showToast({
					title: '请先登录!',
					icon: 'loading'
				});
				setTimeout(() => {
					wx.navigateTo({
						url: '../login/index',
					})
				}, 800);
			}
		} else {
			let item = e.currentTarget.dataset.item
			item.urls = 'https://mschool.donodd.com/index'
			let items = JSON.stringify(item)
			wx.navigateTo({
				url: '../link/link?item=' + items,
			})
		}
	},

	// 信息跳转
	navigate(e) {
		console.log(e)
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let that = this;
		that.setData({
			storAge: wx.getStorageSync('userInfo'),
			defaultAvatar: wx.getStorageSync('userInfo').avatar ? wx.getStorageSync('userInfo').avatar : that.data.defaultAvatar
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
	onShow: function () {},

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