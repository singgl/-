const $ = require('./utils/requit.js')
// const fundebug = require('./utils/funbug/fundebug.0.9.0.min.js')
// 日志监控
// fundebug.init({
//   apikey: 'cd047435f5fc429e625182d72dc884ab754367500f78fc3c9be274cd5dedd790'
// })
App({
  onLaunch: function () {
    //判断是否支持云开发的版本库
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    this.getToken()
  },
  onShow: function (options) {
    // Do something when show.
  },
  onHide: function () {
    // Do something when hide.
  },
  onError: function (msg) {
    console.log(msg)
  },

  // loading加载
  getLoading: function (msg){
    wx.showLoading({
      title:msg,
      mask: true
    })
  },
  hideLading: function(){
    wx.hideLoading()
  },
  // 成功提示
  getSucc:function(msg) {
    wx.showToast({
      title: msg,
      icon: 'success',
      mask: true,
      duration: 1000
    })
  },
  // 错误提示
  getMsag: function(msg){
    wx.showToast({
      title: msg,
      icon:'none',
      mask:true,
      duration: 2000
    })
  },

  //随机数
  RndNum: function(n) {
    var rnd = "";
    for(var i = 0; i<n; i++)
      rnd += Math.floor(Math.random() * 10);
      return rnd;
  },

  // 登录
  logintap: function () {
    let _this = this
    wx.login({
      success: (res) => {
        console.log(res)
        wx.setStorageSync("code", res.code)
        wx.reLaunch({
          url: '/pages/yiguo/login/login'
        })
      },
      fail: (err) => {

      }
    })
  },
  // 获取access_token
  getToken: function(){
    $.appGetRequest("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxe44775f71378af60&secret=0f1963746b3bd211ffb17d1d9a1bb7cd", (res) => {
      console.log(res)
      wx.setStorageSync('token', res)
      wx.showToast({
        title: "获取access_token成功",
        icon: 'none',
        duration: 1000
      })
    }, (err) => {
      wx.showToast({
        title: "网络开了个小差，稍后试试",
        icon: 'none',
        duration: 1000
      })
      console.log(err)
    })
  },
  // 歌曲播放事件
  plsyStatu: function (flag, cache) {
    if (!flag) {
      this.globalData.InnerAudioContext.pause()
      wx.setStorageSync("playStats", false)
    } else {
      this.globalData.InnerAudioContext.src = cache.url
      this.globalData.InnerAudioContext.play()
      wx.setStorageSync("playStats", true)
    }
  },
  
  // Api
  globalData: {
    bash:'https://www.baidu.com',
    InnerAudioContext : wx.createInnerAudioContext(),
  }
})