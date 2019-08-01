// preject/pages/yiguo/welcome/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    indicatorColor: "#fff",
    activeColor: '#1296db',
    duration: 400,
    banner_list:[
      "http://img09.yiguoimg.com/e/ad/2016/160825/585749448986042649_800x400.jpg",
      "http://img09.yiguoimg.com/e/ad/2016/160825/585749448986042649_800x400.jpg",
      "http://img09.yiguoimg.com/e/ad/2016/160825/585749448986042649_800x400.jpg",
      "http://img09.yiguoimg.com/e/ad/2016/160825/585749448986042649_800x400.jpg",
    ],
    count:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("1")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("2")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      count: this.data.banner_list.length-1
    })
    console.log("3", this.data.count)
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
  tabnav: function() {
    wx.switchTab({
      url: '../index/index'
    })
  }
})