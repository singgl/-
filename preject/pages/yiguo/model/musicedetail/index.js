/*
  playStats 播放状态
  flag      标记状态
  cache     当前播放缓存的歌曲
  List      标记歌曲列表

*/
var app = getApp()

Component({
  // 自定义组件属性列表
  properties: {
    showDetail: {
      type: Boolean,
      value: false,
      observer: function (newVal, oldVal, changedPath){
        // 同步播放状态
        if (wx.getStorageSync("playStats")) {
          this.setData({
            show: true
          })
        } else {
          this.setData({
            show: false
          })
        }
      }
    },
    // 标记状态
    stan: {
      type: Boolean,
      value: false,
    },
    // 播放状态
    show: {
      type: Boolean,
      value: false,
    },
  },
  // 组件初始数据
  data:{
    catchs: '',
    songList:[],
  },
  // 第一次进页面执行组件生命周期函数
  attached: function(){
    console.log("组件加载12...")
    this.setData({
      catchs: wx.getStorageSync("cache")
    })
    if (wx.getStorageSync("List")){
      this.setData({
        songList: wx.getStorageSync("List")
      })
    }else{
      wx.setStorageSync("List", this.data.songList)
    }
  },
  ready: function(){
    console.log("组件加载21...")
  },
  // 组件方法
  methods:{
    // 标记当前播放歌曲
    singTap: function(e){
      // 获取当前播放歌曲
      const sing = wx.getStorageSync("cache")
      // 标心的歌曲列表
      const songList = this.data.songList
      console.log(songList)
      const id = e.currentTarget.id
      this.setData({
        stan: !this.data.stan
      })
      if (this.data.stan){
        songList.push(sing)
        wx.setStorageSync("List", songList)
        wx.setStorageSync("flag", true)
      }else{
        songList.forEach((item, index)=>{
          if (item.songid == id){
            songList.splice(index,1)
          }
        })
        wx.setStorageSync("List", songList)
        wx.setStorageSync("flag", false)
      }
      // 调用父组件的跟新方法
      this.triggerEvent('updata', {})
    },
    // 切换
    lastTap: function(){
      console.log("zuo")
    },
    nextTap: function(){
      console.log("you")
    },
    // 播放状态
    playTap: function(){
      this.setData({
        show: !this.data.show
      })
      if (this.data.show){
        wx.setStorageSync("playStats", true)
      }else{
        wx.setStorageSync("playStats", false)
      }
      const cache = wx.getStorageSync("cache")
      const flag = this.data.show
      app.plsyStatu(flag, cache)
    },
    // 列表
    menuTap: function(){

    },
    // 关闭弹窗
    actionSheetbindchange: function () {
      this.setData({
        showDetail: !this.data.showDetail
      })
      console.log("haha ", this.data.showDetail)
      //调用父组件中关闭方法
      this.triggerEvent('closeInvoice', {})
      
    },
    // 更新播放歌曲 同步标心状态
    updata: function(){
      console.log("哈哈")
      this.setData({
        catchs: wx.getStorageSync("cache"),
        stan: wx.getStorageSync("flag"),
      })
    }
  }
})