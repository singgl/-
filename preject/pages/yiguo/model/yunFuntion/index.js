var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsSrc: '',
    price: "",
    numbers: '',
    name: '',
    detail: '',
    imgList: [],
    url: '',
    urlName: '',
    menuIcon: '',
    menuName: ''
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


  // 上传图片
  AddImg: function () {
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        app.getLoading("上传中")
        let code = app.RndNum(10)
        const filePath = res.tempFilePaths[0]
        const cloudPath = 'my-image' + code + filePath.match(/\.[^.]+?$/)[0]
        that.setData({
          goodsSrc: filePath,
          cloudPath: cloudPath
        })
      },
      fail: e => {
        console.log(e)
      },
      complete: e => {
        app.hideLading()
      }
    })
  },
  // 提交商品
  Add: function () {
    let _this = this;
    const name = this.data.name
    if (this.data.cloudPath != '' && this.data.filePath != '' && this.data.price != '' && this.data.numbers != '' && this.data.detail != '') {
      app.getLoading("上传中")
    } else {
      app.getMsag("未选中图片")
      return
    }
    const cloudPath = this.data.cloudPath
    const filePath = this.data.goodsSrc
    console.log(cloudPath, filePath, "~~~~~~~~~~~~~~~~~~~~")
    // 上传图片
    wx.cloud.uploadFile({
      cloudPath,
      filePath,
      success: res => {
        console.log('[上传文件] 成功：', res)
        let fileID = res.fileID;
        // 将文件id同步到数据库
        const db = wx.cloud.database()
        db.collection(name).add({
          data: {
            fileID: fileID,
            price: _this.data.price,
            numbers: _this.data.numbers,
            detail: _this.data.detail,
          },
          success: res => {
            _this.setData({
              goodsSrc: '',
              numbers: '',
              price: '',
              detail: '',
              name: '',
            })
            // 在返回结果中会包含新创建的记录的 _id
            app.hideLading()
            app.getSucc("上传成功")
          },
          fail: err => {

          }
        })
      },
      fail: e => {
        console.error('[上传文件] 失败：', e)
        app.getMsag("上传失败")
      },
      complete: () => {
        // wx.hideLoading()
      }
    })
  },
  eventPriect: function (e) {
    console.log(e)
    this.setData({
      price: e.detail.value
    })
  },
  eventNum: function (e) {
    this.setData({
      numbers: e.detail.value
    })
  },
  eventDel: function (e) {
    this.setData({
      detail: e.detail.value
    })
  },
  eventName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  eventUrl: function (e) {
    this.setData({
      url: e.detail.value
    })
  },
  eventMenu: function (e) {
    this.setData({
      menuName: e.detail.value
    })
  },
  eventUrlName: function (e) {
    this.setData({
      urlName: e.detail.value
    })
  },
  // 图片资源
  upLoad: function () {
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        let code = app.RndNum(10)
        const filePath = res.tempFilePaths[0]
        const cloudPath = 'image' + code + filePath.match(/\.[^.]+?$/)[0]
        let list = {}
        let Array = that.data.imgList
        list.filePath = filePath
        list.cloudPath = cloudPath
        Array.push(list)
        that.setData({
          imgList: Array
        })
        console.log(that.data.imgList, "---------------")
      },
      fail: e => {
        console.log(e)
      },
      complete: e => {

      }
    })
  },
  // 提交图片
  submin: function () {
    let _this = this
    app.getLoading("上传中")
    this.data.imgList.forEach((item, index) => {
      console.log(item)
      let cloudPath = item.cloudPath
      let filePath = item.filePath
      wx.cloud.uploadFile({
        cloudPath,
        filePath,
        success: res => {
          console.log('[上传文件] 成功：', res)
          let fileID = res.fileID;
          // 将文件id同步到数据库
          const db = wx.cloud.database()
          db.collection('imglist').add({
            data: {
              fileID: fileID,
            },
            success: res => {
              _this.setData({
                imgList: []
              })
              // 在返回结果中会包含新创建的记录的 _id
              app.hideLading()
              app.getSucc("上传成功")
            },
            fail: err => {

            }
          })
        },
        fail: e => {
          console.error('[上传文件] 失败：', e)
          app.getMsag("上传失败")
        },
        complete: () => {
          // wx.hideLoading()
        }
      })
    })
  },
  // 添加url
  addline: function () {
    app.getLoading("提交中")
    let _this = this;
    const name = this.data.urlName
    const db = wx.cloud.database()
    db.collection(name).add({
      data: {
        fileID: _this.data.url,
      },
      success: res => {
        _this.setData({
          url: '',
          urlName: ""
        })
        // 在返回结果中会包含新创建的记录的 _id
        app.hideLading()
        app.getSucc("成功")
      },
      fail: err => {

      }
    })
  },
  // 提添加icon
  addIcon: function () {
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        let code = app.RndNum(10)
        const filePath = res.tempFilePaths[0]
        const cloudPath = 'icon' + code + filePath.match(/\.[^.]+?$/)[0]
        that.setData({
          menuIcon: filePath,
          cloudPath: cloudPath
        })
      },
      fail: e => {
        console.log(e)
      },
      complete: e => {

      }
    })
  },
  // 提交菜单
  addMenu: function () {
    app.getLoading("提交中")
    let _this = this;
    const db = wx.cloud.database()
    db.collection('menuList').add({
      data: {
        icon: _this.data.menuIcon,
        name: _this.data.menuName,
        cloudPath: _this.data.cloudPath,
      },
      success: res => {
        _this.setData({
          url: ''
        })
        // 在返回结果中会包含新创建的记录的 _id
        app.hideLading()
        app.getSucc("成功")
      },
      fail: err => {

      }
    })
  }
})