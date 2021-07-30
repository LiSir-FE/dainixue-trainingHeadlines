//app.js
const httpConfig = require('./httpConfig.js')
App({
  onLaunch: function () {
    let code = '';
    let token = '';
    wx.ajax = (config) => {
        let requestConfig = {
          method: config.method
        }
        if (wx.getStorageSync('token')) {
          requestConfig.header = {
            Authorization: 'Bearer ' + wx.getStorageSync('token')
          }
        }
        requestConfig = Object.assign(requestConfig, config);
        requestConfig.url = this.buildUrl(config.url, config.data);
        let success = requestConfig.success;
        let fail = requestConfig.fail;
        requestConfig.success = (res) => {
          if (res.statusCode === 200) {
            if (res.data.code === 200) {
              success && success(res);
            } else {
              fail && fail(res);
            }
          } else {
            wx.showToast({
              title: res.errMsg
            });
          }
        }
        return wx.request(requestConfig)
      },

      this.globalData = {}
  },


  convertHtmlToText: function convertHtmlToText(inputText) {
    var returnText = "" + inputText;
    returnText = returnText.replace(/<\/div>/ig, '\r\n');
    returnText = returnText.replace(/<\/li>/ig, '\r\n');
    returnText = returnText.replace(/<li>/ig, '  *  ');
    returnText = returnText.replace(/<\/ul>/ig, '\r\n');
    //-- remove BR tags and replace them with line break
    returnText = returnText.replace(/<br\s*[\/]?>/gi, "\r\n");

    //-- remove P and A tags but preserve what's inside of them
    returnText = returnText.replace(/<p.*?>/gi, "\r\n");
    returnText = returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");

    //-- remove all inside SCRIPT and STYLE tags
    returnText = returnText.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
    returnText = returnText.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
    //-- remove all else
    returnText = returnText.replace(/<(?:.|\s)*?>/g, "");

    //-- get rid of more than 2 multiple line breaks:
    returnText = returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\r\n\r\n");

    //-- get rid of more than 2 spaces:
    returnText = returnText.replace(/ +(?= )/g, '');

    //-- get rid of html-encoded characters:
    returnText = returnText.replace(/ /gi, "");
    returnText = returnText.replace(/&/gi, "&");
    returnText = returnText.replace(/"/gi, '"');
    returnText = returnText.replace(/</gi, '<');
    returnText = returnText.replace(/>/gi, '>');
    returnText = returnText.replace(/\s+/g, '');

    return returnText;
  },

  buildUrl: function (path, params) {
    var url = httpConfig.baseUrl + path;
    var paramUrl = "";
    if (params) {
      paramUrl = Object.keys(params).map(function (k) {
        return [encodeURIComponent(k), encodeURIComponent(params[k])].join("=");
      }).join("&");
      paramUrl = "?" + paramUrl;
    }
    return url + paramUrl;
  },
  globalData: {
    login_info: '',
    token: ''
  }
})