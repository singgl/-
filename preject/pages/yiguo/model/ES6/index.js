// preject/pages/yiguo/model/ES6/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    model:1,
    scollHeight:0,
    current: 'tab1',
    falge:true,
    active: 1,
    list:[
      
    ],
    list2:[
      {
        image: 'http://cloudretail.kingdee.com:1700/upload/image/20181119/20181119145234_73_16.png',
        title: 'hehehe1'
      },
      {
        image: 'http://cloudretail.kingdee.com:1700/upload/image/20181119/20181119145234_73_16.png',
        title: 'hehehe2'
      },
      {
        image: 'http://cloudretail.kingdee.com:1700/upload/image/20181119/20181119145234_73_16.png',
        title: 'hehehe3'
      },
    ]
  },
  // 获取高度
  getScollheight() {
    wx.getSystemInfo({
      success: sys => {
        let query = wx.createSelectorQuery()
        query.select('.title').boundingClientRect() //获取指定的节点高度
        query.exec(res => {
          console.log(sys, res)
          if (!res[0]) return
          this.setData({ scollHeight: sys.windowHeight - res[0].height })
          console.log(this.data.scollHeight)
        })
      }
    })
  },
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getScollheight()
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

  },
  clicktap: function(){
    console.log("点击了我")
    
  },
  longclick: function(){
    console.log("长按")
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