//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    scrollTop:'',
    
    show: true,
    userInfo: {},
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 500,
    swiperCurrent:0,
    
    circular: true,
    swiperIn:0,
    previousmargin: '30px',//前边距    
    nextmargin: '30px',//后边距
    banner_list: [
      
    ]
  },

  onLoad: function () {
    wx.showNavigationBarLoading()
    app.getLoading("加载中......")
    let _this = this;
    const db = wx.cloud.database()
    db.collection('swiperlist').where({
      _openid: '' // 填入当前用户 openid
    }).get().then(res => {
      console.log(res.data)
      _this.setData({
        banner_list: res.data
      })
      app.hideLading()
    })

    if (wx.getStorageSync("show")){
      console.log('1')
      this.setData({
        show: false
      })
    }else{
      console.log('2')
      this.setData({
        show: true
      })
    }
    
  },
  onShow:function() {
    var that = this;
    setTimeout(function () { that.setClose() }, 1000)
  },
  setClose: function () {
    wx.hideNavigationBarLoading()
  },
  // 图一
  swiperChange: function(e){
    this.setData({
      swiperCurrent: e.detail.current,
    })
  },
  // 图二
  swiperChanges: function(e){
    this.setData({
      swiperIn: e.detail.current
    })
  },
  // 滚动事件
  scroll: function(e){
    console.log(e)
  },
  // 关闭遮罩广告
  bindCartsDel: function(){
    wx.setStorageSync("show", false)
    this.setData({
      show: false
    })
  }
})
