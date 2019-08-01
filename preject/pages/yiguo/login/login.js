var app = getApp()

Page({
  data:{
    signinHidden: false,
    userInfo: {},
  },
  // 账号登录 手机号授权
  modalconfirm: function (e) {
    console.log("111111111111",e)
    
  },
  // 微信登录
  modalcancel: function (e) {
    console.log(e)
    var that = this;
    if (e.detail.errMsg != 'getUserInfo:ok') {
      //用户拒绝
      console.log("拒绝授权", e);
    } else {
      app.getLoading("加载中...")
      console.log("用户允许微信授权", e);
      wx.setStorageSync('userInfo', e.detail.userInfo);
      // 这里可以发送code到后台换取秘钥
      console.log(app.globalData.code, "---------------")
      wx.switchTab({
        url: '../mine/mine'
      })
    }
  },
})
