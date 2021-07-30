// miniprogram/pages/search/index.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		active: '0',
		typeNum: '1',
		searchValue: '',
		selectArray: [{
				text: '资讯',
				id: '1'
			},
			{
				text: '课程',
				id: '2'
			}
		],
		activeFlag: false,
		dataNum: '0条',
		iconSrc: 'like-o',
		textArrays: [],
		scrollY: false,
		hidden: true,
		pageNo: 1,
		pageSize: 10,


		bookInfo: []// 书籍信息
	},

	selectChange(e) {
		this.setData({
			typeNum: e.detail + 1
		})
		if(e.detail == 1) {
			this.setData({
				activeFlag: true,
			})
		} else {
			this.setData({
				activeFlag: false
			})
		}
		this.onSearch()
	},
	iconClick(e) {
		this.onSearch()
	},
	// tabs切换
	tabsChange(e) {
		this.setData({
			active: e.detail.index
		})
		this.onSearch()
	},
	/*监听搜索输入框的值*/
	onChange(e) {
		this.setData({
			search: e.detail
		})
	},

	onSearch(e) {
		var that = this;
		//延时执行，防止获取输入框值不对应
		setTimeout(function () {
			if (that.data.search) {
				wx.ajax({
					url: 'api/top/search',
					data: {
						search: that.data.search,
						type: that.data.typeNum,
						course_type: that.data.active,
						page: 1
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'GET',
					success: function (res) {
						that.setData({
							textArrays: res.data.data.list,
							dataNum: res.data.data.total + '条'
						})
						if(res.data.data.total >= 1) {
							that.setData({
								scrollY: true
							})
						}
					},
					fail: function (err) {
						console.log(err)
					}
				})
			} else {
				wx.showToast({ title: '请输入要搜索的内容', icon: 'none' });
			}
		}, 800)
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