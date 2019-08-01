Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperIndex:'',
    Images:[
      "http://img09.yiguoimg.com/e/ad/2016/160825/585749448986042649_800x400.jpg",
      "http://img11.yiguoimg.com/e/ad/2016/160927/585749449690947899_800x400.jpg",
      "http://img14.yiguoimg.com/e/ad/2016/160923/585749449636290871_800x400.jpg",
      "http://img13.yiguoimg.com/e/ad/2016/160914/585749449480315182_800x400.jpg"
    ],
    autoplay: true, 
    interval: 2000, 
    duration: 1000, 
    circular: true, 
    previousmargin:'30px',//前边距    
    nextmargin:'30px',//后边距
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '自定义轮播图' })
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
  swiperChange(e) {
    const that = this;
    that.setData({
      swiperIndex: e.detail.current,
    })
  },
})