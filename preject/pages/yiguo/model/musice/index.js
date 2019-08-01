var app = getApp()
const $ = require('../../../../utils/requit.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showDetail: false,    //歌曲详情页
    show: false,          //播放暂停
    pane: false,          //搜索歌曲页显示
    types: false,         //请求头类型
    showList: false,      //歌曲列表显示
    name:'',
    count:0,
    songList:[],
    paneList:[],
    play:{},
    menulist:[
      {
        name:'标心音乐',
        id:1
      },
      {
        name:'电台',
        id:2
      },
      {
        name:'排行榜',
        id:3
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.setNavigationBarTitle({ title: "音乐" })
    const cache = wx.getStorageSync("cache")
    this.setData({
      play: cache,
    })
    this.updata()
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
    this.updata()
    this.setData({
      list: wx.getStorageSync("List")
    })
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

  },
 
  // 标签页
  detaile: function(e){
    const id = parseInt(e.currentTarget.id);
    if(id == 1){
      console.log("标心")
    } else if (id == 2){
      console.log("电台")
    } else if (id == 3){
      console.log("排行")
    }
  },
  // 播放暂停
  play: function() {
    const cache = wx.getStorageSync("cache")
    this.setData({
      show: !this.data.show
    })
    const flag = this.data.show
    app.plsyStatu(flag, cache)
  },
 
  
  // 跳转播放页
  detailTap: function(){
    let flag = wx.getStorageSync("cache")
    // 判断缓存歌曲是否存在
    if (flag){
      this.setData({
        showDetail: !this.data.showDetail,
      })
      // 调用子组件中的updata函数更新播放歌曲信息
      this.selectComponent('#detail').updata()
    }else{
      app.getMsag("还未添加歌曲")
    }
    
  },
  // 关闭播放页
  closeInvoice: function () {
    this.setData({
      showDetail: false,
      list: wx.getStorageSync("List")
    })
    this.updataStatus()
  },
  // 更新播放状态
  updataStatus: function(){
    if (wx.getStorageSync("playStats")) {
      this.setData({
        show: true
      })
    } else {
      this.setData({
        show: false
      })
    }
    const cache = wx.getStorageSync("cache")
    const flag = this.data.show
    app.plsyStatu(flag, cache)
  },

  // 更新标心列表
  updata: function(){
    const Array = wx.getStorageSync("List")
    console.log(Array,"------列表更新了-------")
    if (Array.length > 0) {
      this.setData({
        count: Array.length,
      })
    }else{
      this.setData({
        count: Array.length,
      })
    }
    console.log(this.data.count)
  },


  // 解耦
  // 1. 搜索歌曲
  eventTap: function (e) {
    this.setData({
      // name: e.detail.value.replace(/s\+|\s+$/g,'')  //进制输入空格
      name: e.detail.value
    })
  },
  seacher: function () {
    const _this = this
    if (_this.data.name == '') {
      app.getMsag("歌曲名称不能为空")
      return
    }
    app.getLoading("搜索中...")
    var data = {
      name: _this.data.name,
    }
    $.appRequest(_this.data.types, "http://api.apiopen.top/searchMusic", data, (res) => {
      app.hideLading()
      if (res.code == 200) {
        if (res.result != '') {
          _this.setData({
            pane: true,
            // songList: res.result,
            paneList: res.result,
          })
        } else {
          app.getMsag("未找到该歌曲")
        }
      } else {
        app.getMsag("未知错误")
      }
    }, (err) => {
      app.hideLading()
      wx.showToast({
        title: "网络开了个小差，稍后试试",
        icon: 'none',
        duration: 1500
      })
      console.log(err)
    })
  },
  // 2. 点击搜索播放选择的歌曲
  playSong: function (e) {
    const item = e.currentTarget.dataset.item
    wx.setStorageSync("cache", item) //缓存播放歌曲
    this.isSeasion(item.songid)
    // wx.setStorageSync("flag", false) 
    this.setData({
      pane: false,
      play: item,
      name: ''
    })
  },

  // 歌曲列表展开
  menutap: function () {
    this.setData({
      showList: true
    })
  },
  // 歌曲列表关闭
  clocseMap: function () {
    this.setData({
      showList: false
    })
  },
  // 从歌曲列表选择歌曲播放
  Plsy: function (e) {
    let id = e.currentTarget.dataset.id
    this.isSeasion(id)
    this.setData({
      play: wx.getStorageSync("cache")
    })
  },
  // 删除歌曲列表,同步标心列表数据
  Delete: function (e) {
    let id = e.currentTarget.dataset.id
    // this.isSeasion(id)
    console.log("删除")
  },

  // 公共方法 判断选择播放的歌曲是否已缓存过
  // 歌曲id
  isSeasion: function(id){
    console.log(id,"-------------id")
    if (JSON.stringify(this.data.list) === '[]') {
      wx.setStorageSync("flag", false) 
    }else{
      for (let i = 0; i <= this.data.list.length-1; i++){
        var item = this.data.list[i]
        console.log(item)
        if (id === item.songid) {
          wx.setStorageSync("flag", true)
          wx.setStorageSync("cache", item)
          console.log(id, "-------------id1")
        } else {
          console.log(id, "-------------id2")
          wx.setStorageSync("flag", false)
        }
      }
    }
  }
})