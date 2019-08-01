var app = getApp()

Page({
  data:{
    value:'',
    show: false,
    historyList:[],
    current: 0,
  },
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh')
  },
  onLoad:function(options){
    this.query()
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    this.query()
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },

  // 搜索
  changeValue: function(e){
    this.setData({
      value: e.detail.value
    })
  },
  seacher: function() {
    console.log(this.data)
    let _this = this
    app.getLoading("搜索中...")
    const db = wx.cloud.database()
    db.collection("historyList").add({
      data: {
        value: _this.data.value,
      },
      success: res => {
        _this.setData({
          value: '',
        })
        _this.query()
        app.hideLading()
      },
      fail: err => {
        app.getLoading("请求超时, 稍后再试")
      }
    })
  },
  // 删除记录
  eventClear: function() {
    wx.showNavigationBarLoading()
    let _this = this
    const db = wx.cloud.database()
    db.collection('historyList').doc("value").remove().then(res => {
      _this.query()
      wx.hideNavigationBarLoading()
    }).catch(e =>{

    })
  },
  // 查询历史记录
  query: function() {
    app.getLoading("查询中...")
    let _this = this
    const db = wx.cloud.database()
    db.collection('historyList').where({
      _openid: '' // 填入当前用户 openid
    }).get().then(res => {
      _this.setData({
        historyList: res.data
      })
      console.log("哈哈", res)
      if (res.data.length == 0) {
        this.setData({
          show: false
        })
      } else {
        this.setData({
          show: true
        })
      }
      app.hideLading()
    })
  },
  // 复制
  copy: function(e) {
    console.log(e)
    wx.setClipboardData({
      data: e.currentTarget.dataset.value,
      success: res=>{
        console.log(res)
        wx.hideToast()
        app.getMsag('复制成功')
      },
      fail: err=>{

      }
    })
  }
})
