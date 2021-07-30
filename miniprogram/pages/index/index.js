//index.js
const app = getApp()

Page({
  data: {
    indexSearch: '../../images/index/index-search.png',
    marginHeight: '310',
    bannerSrc: '', // 图片地址
    activeArray: [{
      title: '热点资讯',
      id: '0'
    }], // 导航
    active: '0', // tabs默认选中
    msgList: [], // 公告内容
    // imagesSrc: '../../images/index/index-ketang.png', // 图片地址
    imagesSrc: '', // 图片地址
    imageText: [], // 图文
    carousel: [], // 轮播图
    vertical: false, //滑动方向是否为纵向
    autoplay: true, //是否自动切换
    interval: 2000, //自动切换时间间隔
    duration: 500, //滑动动画时长
    circular: true, //是否采用衔接滑动

    imgheights: '', // 轮播图片高度

    journalism1: {}, // 新闻一
    journalism2: {} // 新闻二
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      active: 0
    })
  },
  bannerFn(e) {
    let obj = e.currentTarget.dataset
    wx.navigateTo({
      url: '../trainVadios/index?courseType=' + obj.coursetype + '&id=' + obj.id,
    })
  },

  // 图片加载
  imageLoad(e) {
    let that = this;
    let query = wx.createSelectorQuery();
    query.select('#containerViewId').boundingClientRect(function (res) {}).exec(function (res) {
      that.setData({
        marginHeight: res[0].height
      })
    })

  },
  imageLoadFn(e) {
    let winWid = wx.getSystemInfoSync().windowWidth // 获取当前屏幕宽度
    let imgH = e.detail.height; //图片高度
    let imgW = e.detail.width // 图片宽度
    let swiperH = winWid * imgH / imgW
    this.setData({
      imgheights: swiperH - 80
    })
  },

  bannerFns(e) {
    wx.navigateTo({
      url: '../InformationDetails/index?top_id=' + e.currentTarget.dataset.id,
    })
  },


  // 请求banner
  getBanner() {
    let that = this;
    wx.ajax({
      url: 'api/sub/course',
      method: 'GET',
      success: function (res) {
        that.setData({
          bannerSrc: res.data.data.banner,
          carousel: res.data.data.list
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  // 请求导航信息
  getMenus() {
    let that = this;
    wx.ajax({
      url: 'api/dnx/menus',
      method: 'GET',
      success: function (res) {
        that.setData({
          activeArray: that.data.activeArray.concat(res.data.data)
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },

  // 请求用户实时登录信息
  getScrollLog() {
    let that = this;
    wx.ajax({
      url: 'api/top/scrollLog',
      method: 'GET',
      success: function (res) {
        that.setData({
          msgList: res.data.data
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },

  // 请求广告图
  getAdv() {
    let that = this;
    wx.ajax({
      url: 'api/adv/getAdv',
      data: {
        client_type: 2,
        pos: 1
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          imagesSrc: res.data.data.thumb_img
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },

  // 请求首页信息和视频接口
  getTopList() {
    let that = this;
    wx.ajax({
      url: 'api/top/list',
      data: {
        top_type: 1,
        client_type: 2
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          imageText: res.data.data
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },

  //  获取首页底部内容
  getMidTop() {
    let that = this;
    wx.ajax({
      url: 'api/top/getMidTop',
      method: 'GET',
      success: function (res) {
        that.setData({
          journalism1: res.data.data.midNew,
          journalism2: res.data.data.lastNew
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },

  // tabs切换
  tabsChange(e) {
    let idx = e.detail.index
    this.setData({
      active: idx
    })
    if (e.detail.index != 0) {
      wx.navigateTo({
        url: '../trainVadios/index?courseType=' + idx + '&id=' + idx,
      })
    }
  },

  // 搜索
  seachFn() {
    wx.navigateTo({
      url: '../search/index',
    })
  },

  onLoad: function () {
    this.getBanner();
    this.getMenus();
    this.getScrollLog();
    this.getAdv();
    this.getTopList();
    this.getMidTop();
  },
  // 小程序监听页面回显事件
  wxMiniProgramReady() {
    WeixinJSBridge.on('onPageStateChange', (res = {}) => {
      console.log(res)
      if (res && res.active) {
        // do something
      }
    })
  }
})