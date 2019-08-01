var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    curModel: 1,
    scollHeight:0,
    checkedCartsIds:[],
    tablist:[
      {
        name:'线上线',
        id:1
      },
      {
        name:'线下线',
        id:2
      }
    ],
    carts: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    app.hideLading()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.getLoading("加载中")
    this.getHeight()
    let id = this.data.curModel
    this.qureyList(id)
  },
  // tab切换
  switchTab: function(e){
    // app.getLoading("加载中")
    let id = e.currentTarget.dataset.id
    this.setData({
      curModel: id,
    })
    this.getCartList()
  },
  // 计算中间板块高度
  getHeight: function(){
    let _this = this
    let query = wx.createSelectorQuery()
    query.select('.tabar').boundingClientRect()
    query.select('.footer').boundingClientRect()
    query.exec(res => {
      console.log(res,"----------------------")
      let theight = res[0].height
      let fheight = res[1].height
      wx.getSystemInfo({
        success: res => {
          console.log(res, "----------------------")
          let height = res.windowHeight - (theight + fheight)
          _this.setData({
            scollHeight: height
          })
        }
      })
    })
  },
  // 获取商品列表
  getCartList: function(){
    console.log("查询")
    let _this = this
    let id = this.data.curModel
    this.qureyList(id)
  },
  // 商品查询
  qureyList: function(id){
    if(id === 1){
      this.setData({
        carts:[
          {
            id: 1,
            selected: false,
            image: "http://img14.yiguoimg.com/e/ad/2016/160914/585749449477366062_260x320.jpg",
            title: "口红膏体4T",
            price: 0.06,
            num: 1,
          },
          {
            id: 2,
            selected: false,
            image: "http://img14.yiguoimg.com/e/ad/2016/160914/585749449477366062_260x320.jpg",
            title: "口红膏体4T",
            price: 0.05,
            num: 1,
          },
          {
            id: 3,
            selected: false,
            image: "http://img14.yiguoimg.com/e/ad/2016/160914/585749449477366062_260x320.jpg",
            title: "口红膏体4T",
            price: 0.04,
            num: 1,
          },
          // {
          //   id: 4,
          //   selected: false,
          //   image: "http://img14.yiguoimg.com/e/ad/2016/160914/585749449477366062_260x320.jpg",
          //   title: "口红膏体4T",
          //   price: 0.03,
          //   num: 1,
          // },
          // {
          //   id: 5,
          //   selected: false,
          //   image: "http://img14.yiguoimg.com/e/ad/2016/160914/585749449477366062_260x320.jpg",
          //   title: "口红膏体4T",
          //   price: 0.02,
          //   num: 1,
          // },
          // {
          //   id: 6,
          //   selected: false,
          //   image: "http://img14.yiguoimg.com/e/ad/2016/160914/585749449477366062_260x320.jpg",
          //   title: "口红膏体4T",
          //   price: 0.1,
          //   num: 1,
          // },
          {
            id: 7,
            selected: false,
            image: "http://img14.yiguoimg.com/e/ad/2016/160914/585749449477366062_260x320.jpg",
            title: "口红膏体4T",
            price: 0.11,
            num: 1,
          }
        ]
      })
    }else{
      this.setData({
        carts:[]
      })
    }
  },
  // 扫码添加
  scan: function(){

  },
  // 提交订单
  goCheckout: function(){

  },
  // 全选
  checkAll: function(){

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
    
  }
})