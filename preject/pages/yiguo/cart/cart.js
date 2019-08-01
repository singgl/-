var app = getApp();

Page({
  data:{
    menuList:[
      {
        name: "echarts",
        id:1
      },
      {
        name: "自定义弹窗",
        id:2
      },
      {
        name: "仿造购物车",
        id: 3 
      },
      {
        name: "自定义Tab",
        id:4
      },
      {
        name: "地图",
        id:5
      },
      {
        name: "选项卡",
        id:6
      },
      {
        name: "云函数",
        id:7
      },
      {
        name: "音乐",
        id:8
      },
      {
        name: "埋点导航",
        id:9
      },
      {
        name: "滑动tab",
        id:10
      },
    ],
  },
  // 页面初始化 options为页面跳转所带来的参数1
  onLoad:function(options){
    wx.showNavigationBarLoading()
  },
  // 页面渲染完成3
  onReady:function(){
    
  },
  // 页面显示2
  onShow:function(){
    wx.hideNavigationBarLoading()
  },
  // 页面隐藏
  onHide:function(){
    
  },
  // 页面关闭
  onUnload:function(){
    
  },
  // 下拉刷新操作
  onPullDownRefresh: function () {
    var that = this;
    wx.showNavigationBarLoading() //顶部导航加载
    setTimeout(function () { that.setClose()}, 1000)
  },
  // 关闭下拉
  setClose: function(){
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
  },
  // 路由跳转
  Jump: function (e) {
    console.log(e)
    let name = e.currentTarget.dataset.name;
    let id = parseInt(e.currentTarget.id);
    console.log(id)
    switch (id) {
      case 1:
        wx.navigateTo({
          url: '../../../package/echarts/index'
        })
        break;
      case 2:
        wx.navigateTo({
          url: '../template/sheet/sheet'
        })
        break;
      case 3:
        wx.navigateTo({
          url: '../model/shop/shop'
        })
        break;
      case 4:
        wx.navigateTo({
          url: '../model/Tab/index'
        })
        break;
      case 5:
        wx.navigateTo({
          url: '../model/Map/map'
        })
        break;
      case 6:
        wx.navigateTo({
          url: '../model/tabcard/index'
        })
        break;
      case 7:
        wx.navigateTo({
          url: '../model/yunFuntion/index'
        })
        break;
      case 8:
        wx.navigateTo({
          url: '../model/musice/index?name=' + name
        })
        break;
      case 9:
        wx.navigateTo({
          url: '../model/router/index'
        })
        break;
      case 10:
        wx.navigateTo({
          url: '../model/ES6/index'
        })
        break;
      default:
    }
  },
})




