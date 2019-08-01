Page({

  /**
   * 页面的初始数据
   */
  data: {
    showInvoice:false,
    id:0,
    value:'哈哈'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '自定义菜单' })  
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
  // 弹出组件
  actionSheetTap: function(){
    console.log("哈哈1", this.data.showInvoice)
    this.setData({
      showInvoice: !this.data.showInvoice,
      id:5,
      value:'呵呵'
    })
    console.log("哈哈2", this.data.showInvoice)
  },
  // 关闭弹出框
  closeInvoice: function () {
    console.log("哈哈2111", this.data.showInvoice)
    this.setData({
      showInvoice: false
    })
    
  },
})