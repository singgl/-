var app = getApp()
const $ = require('../../../utils/requit.js')
Page({
  data:{
    userInfo: {},
    types: true,
    notice: '蘑菇街平台将在1月22日0点－9点进行系统升级，升级期间将暂停服务，敬请谅解。'
  },
  onLoad:function(options){
    
  },
 
  onShow:function(){
    app.getLoading("加载中")
    if (!wx.getStorageSync('userInfo')){
      app.hideLading()
      wx.showModal({
        title: '提示',
        content: '尚未登录, 点击进行登录授权! ',
        cancelText: '否',
        cancelColor: "#000",
        confirmText: '是',
        success: function (res) {
          if (res.cancel) {
            console.log("哈哈哈哈哈哈哈")
          } else {
            console.log(app.globalData.code)
            app.logintap()
          }
        }
      })
    }else{
      this.setData({
        userInfo: wx.getStorageSync('userInfo'),
      })
      app.hideLading()
    }
  },
  onReady: function () {
    
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  // ui库toast组件
  toast: function(){
    this.setData({
      $toast: {
        show: true
      }
    })
    setTimeout(() => {
      this.setData({
        $toast: {
          show: false
        }
      })
    }, 1500)
  },
  // 通告栏
  notice: function(){

  },
  onClose() {
    wx.showToast({ title: 'closed' });
  },

  // 登录
  logintap: function() {
    app.logintap()
  },
  // 模版
  orderMake: function(e){
    var formId = e.detail.formId
    console.log(formId)
    var token = wx.getStorageSync("token")
    console.log(token.access_token)
    var data = {
      "touser": "o8sP20InYgAS7OI4aX8flW5hlg_E",
      "template_id": 'qW9hzuFdAAfQG7snWyj63rADO3IvfElbZb4Ha1fKg_w',
      "page": "pages/yiguo/index/index",
      "form_id": formId,
      "data": {
        "keyword1": {
          "value": "哈哈哈"
        },
        "keyword2": {
          "value": "13001254456"
        },
        "keyword3": {
          "value": "2018.11.05"
        } ,
        "keyword4": {
          "value": "哈哈"
        }
      },
    }
    $.appRequest(this.data.types, "https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=" + token.access_token
, data ,(res) => {
      console.log(res)
      
    }, (err) => {
      wx.showToast({
        title: "网络开了个小差，稍后试试",
        icon: 'none',
        duration: 1500
      })
      console.log(err)
    })
  },
  // 获取openid
  getOpenid: function(){
    var code = wx.getStorageSync("code")
    // appid+秘钥及code值换取openid
    $.appGetRequest("https://api.weixin.qq.com/sns/jscode2session?appid=wxe44775f71378af60&secret=0f1963746b3bd211ffb17d1d9a1bb7cd&js_code=" + code + "&grant_type=authorization_code", (res) => {
      console.log(res, "1111111111111111111")
    }, (err) => {
      wx.showToast({
        title: "网络开了个小差，稍后试试",
        icon: 'none',
        duration: 1500
      })
      console.log(err)
    })
  }
})