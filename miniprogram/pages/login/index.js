// miniprogram/pages/login/index.js
let utils = require('../../utils/publicFun.js')
let app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		loginSrc: '../../images/index/login-logo.png', // 登录logo
		active: 'a', // tab指向
		passVcode: true, // tab判断
		getCode: '获取验证码', // 获取验证码
		phone: '', // 手机号
		codeDisabled: false, // 控制验证码
		register: '注册', // 注册or登录
		registerFlag: true, //注册or登录
		yesorNo: '没有', //有or没有
		loginText: '登录', // 登录or注册
		vCode: '', // 验证码
		password: '', // 密码
	},

	tabsChange(e) {
		if (e.detail.index === 0) {
			this.setData({
				passVcode: true
			})
		} else {
			this.setData({
				passVcode: false
			})
		}
	},

	// 获取验证码
	getCodeFun() {
		let that = this;
		let phone = utils.checkPhone(that.data.phone, '请输入手机号!');
		if (phone) {
			var num = 60;
			var timer = setInterval(function () {
				num--;
				if (num <= 0) {
					clearInterval(timer);
					that.setData({
						getCode: '重新发送',
						codeDisabled: false
					})
				} else {
					that.setData({
						getCode: num + 's',
						codeDisabled: true
					})
				}
			}, 1000)
			that.getSmsCode(that.data.phone)
		}
	},
	// 获取验证码
	getSmsCode(phone) {
		wx.ajax({
			url: 'api/dnx/smsCode',
			data: {
				mobile: phone,
				sms_type: 'login'
			},
			method: 'POST',
			success: function (res) {
				wx.showToast({
					title: '已发送',
					icon: 'none'
				});
			},
			fail: function (err) {
				wx.showToast({
					title: err.data.msg,
					icon: 'error'
				});
			}
		})
	},
	// 输入手机号
	phoneInput(e) {
		this.setData({
			phone: e.detail.value
		})
	},

	// 输入验证码
	vCodeInput(e) {
		this.setData({
			vCode: e.detail.value
		})
	},

	// 输入验证码
	passwordInput(e) {
		this.setData({
			password: e.detail.value
		})
	},

	// 注册or登录
	registerFun(e) {
		if (e.target.dataset.registerflag) {
			this.setData({
				registerFlag: !e.target.dataset.registerflag,
				register: '登录',
				yesorNo: '已有',
				loginText: '快速注册',
				password: ''
			})
		} else {
			this.setData({
				registerFlag: !e.target.dataset.registerflag,
				register: '注册',
				yesorNo: '没有',
				loginText: '登录'
			})
		}
		wx.setNavigationBarTitle({
			title: this.data.register
		})

	},

	// 登录or注册
	login(e) {
		let that = this;
		if (e.detail.target.dataset.login) {
			if (that.data.passVcode) {
				let vCode = utils.userName(e.detail.value.vCode, '请输入验证码!');
				let phone = utils.checkPhone(e.detail.value.phone, '请输入手机号!');
				if (vCode && phone) {
					console.log(phone, vCode, '验证码登录')
					that.dnxLoginFn(e.detail.value.phone, 'login', e.detail.value.vCode)
				} else {
					console.log(phone, vCode)
				}
			} else {
				let password = utils.userName(e.detail.value.password, '请输入密码!');
				let phone = utils.checkPhone(e.detail.value.phone, '请输入手机号!');
				if (password && phone) {
					console.log(phone, password, '密码登录')
				} else {
					console.log(phone, password)
				}
			}

		} else {
			let vCode = utils.userName(e.detail.value.vCode, '请输入验证码!');
			let phone = utils.checkPhone(e.detail.value.phone, '请输入手机号!');
			if (vCode && phone) {
				that.dnxLoginFn(e.detail.value.phone, 'register', e.detail.value.vCode)
			}
		}
	},

	dnxLoginFn(phone, type, code) {
		let that = this;
		wx.ajax({
			url: 'api/dnx/login',
			data: {
				mobile: phone,
				user_from: 'XCX',
				code: code
			},
			method: 'POST',
			success: function (res) {
				wx.setStorage({
					key: "userInfo",
					data: res.data.data
				})
				app.globalData.login_info = res.data.data
				app.globalData.token = res.data.data.remember_token
				// console.log('app.globalData.userInoapp.globalData.userInoapp.globalData.userIno', app.globalData.login_info, app.globalData.token)
				wx.showToast({
					title: '登录成功!',
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
				wx.showToast({
					title: err.data.msg,
					icon: 'none'
				});
			}
		})
	},


	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

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