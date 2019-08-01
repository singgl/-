var QQMap = require("../../../../utils/libs/qqmap-wx-jssdk.js");
var qqmapsdk;

let plugin = requirePlugin("myPlugin")
let routeInfo = {
  startLat: '',          //起点纬度 选填
  startLng: '',         //起点经度 选填
  startName: "我的位置",        //起点名称 选填
  endLat: 21.94055,            //终点纬度 必传
  endLng: 114.43207,           //终点经度 必传
  endName: "来福士购物中心",    //终点名称 必传
  mode: 'car'                  //算路方式 选填
}

Page({
  data: {
    locationName:'',
    latitude:"",
    longitude:"",
    enable3D: true,
    routeInfo: routeInfo,
  },
  // 页面加载
  onLoad: function(){
    this.getLocation()

    qqmapsdk = new QQMap({
      key: 'BMUBZ-P2CH3-BSC3V-3TLET-LS2J2-77BPA'
    })
  },
  // 页面显示
  onShow: function () {
    wx.hideNavigationBarLoading()
    this.getLocation()
    console.log(qqmapsdk, "---------------");

  },
  poitap: function(e) {
    console.log(e)
  },
  onReady: function(){
    console.log(routeInfo)
  },
  // 获取当前位置,并且定位到当前点
  getLocation: function(){
    let _this = this
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        console.log(res)
        routeInfo.startLat = res.latitude
        routeInfo.startLng = res.longitude
      },
      fail: err => {

      }
    })
    // 当前位置移到地图中心
    let MapContext = wx.createMapContext("map")
    MapContext.moveToLocation()
  }
})