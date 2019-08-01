var app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    scoll: true,
    lazyLoad: true,
    scrollTop:0,
    leftScrollTop: 0,
    curIndex: 0,
    scrollHeight:'',
    gouse:[
      {
        name:"哈哈11",
        products:[
          {
            retjson:{
              mainPhotoPath:''
            },
            name: "1",
            id:''
          }
        ]
      },
      {
        name: "哈哈12", 
        products:[
          {
            retjson:{
              mainPhotoPath:''
            },
            name: "1",
            id:''
          },
          {
            retjson:{
              mainPhotoPath:''
            },
            name: "1",
            id:''
          },
          {
            retjson:{
              mainPhotoPath:''
            },
            name: "1",
            id:''
          },
          {
            retjson:{
              mainPhotoPath:''
            },
            name: "1",
            id:''
          },
        ]
      },
      {
        name:"哈哈13",
        products:[
          {
            retjson:{
              mainPhotoPath:''
            },
            name: "1",
            id:''
          },
          {
            retjson:{
              mainPhotoPath:''
            },
            name: "1",
            id:''
          },
          {
            retjson:{
              mainPhotoPath:''
            },
            name: "1",
            id:''
          },
          {
            retjson:{
              mainPhotoPath:''
            },
            name: "HUAWEIMate10 Pro保时捷",
            id:''
          },
          {
            retjson:{
              mainPhotoPath:''
            },
            name: "1",
            id:''
          },
          {
            retjson:{
              mainPhotoPath:''
            },
            name: "1gdfgdfgdf",
            id:''
          },
          {
            retjson:{
              mainPhotoPath:''
            },
            name: "1",
            id:''
          },
          {
            retjson:{
              mainPhotoPath:''
            },
            name: "1gdfgdfgdfgdfgdfg",
            id:''
          },
        ]
      },
      {
        name:"哈哈14",
        products:[
          {
            retjson:{
              mainPhotoPath:''
            },
            name: "1",
            id:''
          },
          {
            retjson:{
              mainPhotoPath:''
            },
            name: "1",
            id:''
          },
          {
            retjson:{
              mainPhotoPath:''
            },
            name: "1dfgdfgdgdfgdfg",
            id:''
          },
          {
            retjson:{
              mainPhotoPath:''
            },
            name: "1dfgdfgdfgdfg",
            id:''
          },
          {
            retjson:{
              mainPhotoPath:''
            },
            name: "1dgdfgdfg",
            id:''
          },
          {
            retjson:{
              mainPhotoPath:''
            },
            name: "1",
            id:''
          },
          {
            retjson:{
              mainPhotoPath:''
            },
            name: "1",
            id:''
          },
          {
            retjson:{
              mainPhotoPath:''
            },
            name: "1",
            id:''
          },
          {
            retjson:{
              mainPhotoPath:''
            },
            name: "1",
            id:''
          },
          {
            retjson:{
              mainPhotoPath:''
            },
            name: "1",
            id:''
          },
          {
            retjson:{
              mainPhotoPath:''
            },
            name: "1",
            id:''
          },
        ]
      },
      {
        name:"哈哈15",
        products:[
          {
            retjson:{
              mainPhotoPath:''
            },
            name: "1",
            id:''
          }
        ]
      },
      {
        name:"哈哈16",
        products:[
          {
            retjson:{
              mainPhotoPath:''
            },
            name: "1",
            id:''
          }
        ]
      },
      {
        name:"哈哈17",
        products:[
          {
            retjson:{
              mainPhotoPath:''
            },
            name: "1",
            id:''
          }
        ]
      },
      {
        name:"哈哈18",
        products:[
          {
            retjson:{
              mainPhotoPath:''
            },
            name: "1",
            id:''
          }
        ]
      },
      {
        name:"哈哈19",
        products:[
          {
            retjson:{
              mainPhotoPath:''
            },
            name: "1",
            id:''
          }
        ]
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.myData = {}
    this.myData.listHeight = []
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
    this.getSystemHeight()

    let query = wx.createSelectorQuery()
    query.selectAll('.goods-cont').boundingClientRect()  // 获取所有名为goods-cont节点的高度
    query.exec(res => {
      let height = 0
      this.myData.listHeight.push(height)
      console.log(res)
      for(let item of res[0]){
        if(!item.height){
          height += 1
        } else {
          height += item.height
        }
        this.myData.listHeight.push(height)
      }
      // this.myData.listHeight.push(res[0].height)
      console.log(this.myData.listHeight)
    })
  },
  // 获取当前高度
  getSystemHeight() {
    wx.getSystemInfo({
      success: sys => {
        let query = wx.createSelectorQuery()
        query.select('.seachernav').boundingClientRect() //获取指定的节点高度
        query.select('.topnav').boundingClientRect()
        query.exec(res => {
          if (!res[0] || !res[1]) return
          this.setData({ scrollHeight: sys.windowHeight - res[0].height - res[1].height - 1 })
        })
      }
    })
  },
  // 同步滚动
  cateChange: function(e){
    let dataset = e.currentTarget.dataset
    let index = dataset.index
    this.leftCateGoCustomCenter(index) // 将当前选中的放到中间位置
    this.myData.isClick = true         // 是否是点击滚动的
    clearTimeout(this.myData.timer)
    this.myData.timer = setTimeout(() => {
      this.myData.isClick = false
    }, 400)
    console.log(this.myData.listHeight,"--------------------")
    this.setData({
      curIndex: index,
      scrollTop: this.myData.listHeight[index]
    })
  },
  // 左侧scroll-view滚动到当前位置
  leftCateGoCustomCenter(index) {
    let scrollTops = ''
    let query = wx.createSelectorQuery()
    query.select('.Items').boundingClientRect()
    query.exec(res => {
      this.myData.cateItemHeight = res[0].height
      scrollTops = this.myData.cateItemHeight * index - this.data.scrollHeight / 2 + this.myData.cateItemHeight / 2
      this.setData({ leftScrollTop: scrollTops })
    }) 
  },
  // 滚动事件右侧商品
  contentScroll: function(e){
    if (this.myData.isClick) return // 点击跳转来的就不执行后面操作
    console.log(e)
    console.log(this.myData.listHeight)
    for (let i = 0; i < this.myData.listHeight.length; i++) {
      let h1 = this.myData.listHeight[i]

      let h2 = this.myData.listHeight[i + 1]
      if (e.detail.scrollTop < 0) {
        this.setData({ curIndex: 0 })
        return this.leftCateGoCustomCenter(0)
      }
      if (!h2 || (e.detail.scrollTop >= h1 && e.detail.scrollTop < h2)) {
        this.leftCateGoCustomCenter(i)
        return this.setData({ curIndex: i })
      }
    }
    this.leftCateGoCustomCenter(0)
    this.setData({ curIndex: 0 })
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