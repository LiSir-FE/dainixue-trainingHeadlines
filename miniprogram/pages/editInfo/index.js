// miniprogram/pages/editInfo/index.js
let utils = require('../../utils/publicFun.js')
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		avatar: '',
		userNameVal: '',
		phone: '',
		editInfo: [{
				value: '',
				title: '姓名'
			},
			{
				value: '',
				title: '电话'
			}
		],
		modalArray: [{
				name: '相机'
			},
			{
				name: '相册'
			},
			{
				name: '取消'
			}
		],
		modalFlag: false
	},
	// 获取用户信息
	getUser() {
		let that = this;
		wx.ajax({
			url: 'api/dnx/user',
			method: 'GET',
			data: {
				user_id: wx.getStorageSync('userInfo').id
			},
			success: function (res) {
				that.setData({
					userNameVal: res.data.data.nickname,
					phone: res.data.data.mobile,
					avatar: res.data.data.avatar
				})
			},
			fail: function (err) {
				console.log(err)
			}
		})
	},
	submission(e) {
		let that = this;
		let phone = utils.checkPhone(e.detail.value.phone, '请输入手机号!');
		let userNameVal = utils.userNames(e.detail.value.userNameVal, '请输入用户姓名!');
		if (userNameVal || phone) {
			wx.ajax({
				url: 'api/dnx/updateInfo',
				data: {
					user_id: wx.getStorageSync('userInfo').id,
					avatar: that.data.avatar,
					nickname: e.detail.value.userNameVal,
					mobile: e.detail.value.phone
				},
				method: 'POST',
				success: function (res) {
					wx.setStorage({
						key: "userInfo",
						data: res.data.data
					})
					wx.showToast({
						title: '保存成功!',
						icon: 'none'
					});
					setTimeout(() => {

						wx.switchTab({

							url: '../my/index',

							success: function (e) {
								let page = getCurrentPages().pop();

								if (page == undefined || page == null) return;

								page.onLoad();

							}

						});
					}, 800);
				},
				fail: function (err) {
					console.log(err)
				}
			})
		}
	},

	// 上传头像
	changeAvatar() {
		let that = this;
		that.setData({
			modalFlag: true
		})
	},

	modelFn(e) {
		let that = this;
		if (e.detail == 0) {
			that.chooseWxImgageShop('camera'); //手机拍照
		} else if (e.detail == 1) {
			that.chooseWxImgageShop('album'); //从相册中选择
		}
	},

	// 选择图片
	chooseWxImgageShop(type) {
		let that = this;

		wx.chooseImage({
			count: '1',
			sizeType: ['original', 'compressed'],

			sourceType: [type],

			success: function (res) {
				that.upload_file(res.tempFilePaths[0], res.tempFiles[0])
			}

		})
	},

	// 上传图片到服务器
	upload_file: function (filePath, tempFiles) {
		let that = this;
		wx.uploadFile({
			url: 'https://school.donodd.com/api/dnx/img',
			filePath: filePath,
			name: 'file',
			header: {
				'content-type': 'multipart/form-data'
			},
			formData: {
				'file': filePath
			},
			success: function (res) {
				let result = JSON.parse(res.data)
				that.setData({
					avatar: result.data.path
				})
			},
			fail: function (err) {
				console.log(err, '111')
			}
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getUser()
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