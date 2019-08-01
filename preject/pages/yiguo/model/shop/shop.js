var app = getApp();

Page({
  data: {
    startX: 0, //开始坐标
    startY: 0,
    show: true,
    selectedNum: 0,
    totalPrice: 0,
    carts: [
      {
        id: 1,
        selected: true,
        image: "http://img14.yiguoimg.com/e/ad/2016/160914/585749449477366062_260x320.jpg",
        title: "口红膏体4T",
        price: 0.06,
        num: 1,
      },
      {
        id: 2,
          selected: true,
        image: "http://img14.yiguoimg.com/e/ad/2016/160914/585749449477366062_260x320.jpg",
        title: "口红膏体4T",
        price: 0.05,
        num: 1,
      },
      {
        id: 3,
          selected: true,
        image: "http://img14.yiguoimg.com/e/ad/2016/160914/585749449477366062_260x320.jpg",
        title: "口红膏体4T",
        price: 0.04,
        num: 1,
      },
      {
        id: 4,
          selected: true,
        image: "http://img14.yiguoimg.com/e/ad/2016/160914/585749449477366062_260x320.jpg",
        title: "口红膏体4T",
        price: 0.03,
        num: 1,
      },
      {
        id: 5,
          selected: true,
        image: "http://img14.yiguoimg.com/e/ad/2016/160914/585749449477366062_260x320.jpg",
        title: "口红膏体4T",
        price: 0.02,
        num: 1,
      },
      {
        id: 6,
          selected: true,
        image: "http://img14.yiguoimg.com/e/ad/2016/160914/585749449477366062_260x320.jpg",
        title: "口红膏体4T",
        price: 0.1,
        num: 1,
      },
      {
        id: 7,
          selected: true,
        image: "http://img14.yiguoimg.com/e/ad/2016/160914/585749449477366062_260x320.jpg",
        title: "口红膏体4T",
        price: 0.11,
        num: 1,
      }
    ]
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // getshop(this)
  },

  onReady: function () {
    // 页面渲染完成

  },

  onShow: function () {
    // 页面显示
    wx.showNavigationBarLoading()
  },
  onHide: function () {
    // 页面隐藏
    var list = _resetData(this.data.carts)
    this.setData({
      carts: list
    })
  },
  onUnload: function () {
    // 页面关闭
  },
  // 下拉刷新操作
  onPullDownRefresh: function () {
    var that = this;
    wx.showNavigationBarLoading() //顶部导航加载
    setTimeout(function () { that.setClose() }, 1000)
  },
  // 关闭下拉
  setClose: function () {
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
  },
  // 点击商品进入详情
  goOrderDetail: function (e) {
    var orderId = e.currentTarget.dataset.id;
    console.log(orderId)
    orderDetail(orderId)
  },
  // 单选
  bindCheckbox: function (e) {
    var idx = e.currentTarget.dataset.index;
    var carts = this.data.carts;
    var selected = carts[idx].selected;
    // console.log(idx)
    // console.log(carts)
    // console.log(selected)
    carts[idx].selected = !selected;
    this.setData({
      carts: carts
    });
    // 记录单选的个数
    var curuns = 0;
    for (var i = 0; i < this.data.carts.length; i++) {
      if (this.data.carts[i].selected) {
        curuns++;
      }
    }
    // 单选的个数等于数组长度改变全选的状态
    if (curuns == this.data.carts.length) {
      var selectedAllStatus = !selectedAllStatus;
      this.setData({
        selectedAllStatus: selectedAllStatus,
      });
    } else {
      var selectedAllStatus = false;
      this.setData({
        selectedAllStatus: selectedAllStatus,
      });
    }
    countNum(this)
    count(this)
  },
  // 全选
  bindSelectAll: function (e) {
    var selectedAllStatus = this.data.selectedAllStatus;
    var selectedNum = '';
    var carts = this.data.carts;
    selectedAllStatus = !selectedAllStatus;
    for (var i = 0; i < carts.length; i++) {
      carts[i].selected = selectedAllStatus;
    }
    this.setData({
      carts: carts,
      selectedAllStatus: selectedAllStatus,
    });
    countNum(this)
    count(this)
  },
  // 加法
  addtion: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index;
    var num = e.currentTarget.dataset.num
    if (num < 100) {
      num++
    }
    var carts = that.data.carts
    carts[index].num = num
    that.setData({
      carts: carts,
    })
    countNum(that)
    count(that)
  },
  // 减法
  subtraction: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var num = e.currentTarget.dataset.num
    //把新的值给新的数组
    var carts = that.data.carts
    //当1件时，点击移除
    if (num == 1) {
      Popup(that, index)
    } else {
      num--
      carts[index].num = num
      countNum(that)
      count(that)
    }
    that.setData({
      carts: carts
    })
  },
  // 滑动开始
  touchstart: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标

      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    if (angle >= -135 && angle < 135) {
      let startX = getClientX(e)
      startX && that.setData({ startX })
      // console.log(that.data.startX)
    } else {
      console.log("else")
    };

  },
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  // 滑动结束
  touchmove: function (e) {
    var that = this
    // console.log(that.data.carts)
    const width = 90  // 定义操作列表宽度
    let carts = touchE(e, that.data.carts, that.data.startX, width)
    carts && that.setData({ carts })
  },

  // 删除商品
  bindCartsDel: function (e) {
    var idx = e.currentTarget.dataset.index;
    Popup(this, idx)
  },

  // 跳转购物
  cart: function () {
    console.log('cart')
    wx.navigateTo({
      url: "/pages/yiguo/echarts/index"
    })
  },

})
// 查询数据
function getshop(_this){
  app.getLoading("查询中...")
  const db = wx.cloud.database()
  db.collection('fileList').where({
    _openid: '' // 填入当前用户 openid
  }).get().then(res => {
    _this.setData({
      carts: res.data
    })
    console.log("哈哈", res)
    app.hideLading()
  })
}

// 跳转详情页
function orderDetail(orderId) {
  console.log(orderId)
  wx.navigateTo({
    url: "/pages/yiguo/detail/detail?id=" + orderId
  })
}

// 删除商品,重新赋值
function Popup(that, index) {
  wx.showModal({
    title: '删除商品？',
    content: '将该商品移除购物车',
    confirmText: "删除",
    confirmColor: "#EB4335",
    success: function (res) {
      if (res.confirm) {
        detail(that, index)
      }
    }
  })
}
function detail(that, index) {
  var carts = that.data.carts.splice(index, 1)
  console.log(that.data.carts)
  countNum(that)
  count(that)
  that.setData({
    carts: that.data.carts
  })
}
// 合计商品数量
function countNum(that) {
  //遍历数组，把既选中的num加起来
  var newList = that.data.carts
  console.log(newList)
  var allNum = 0
  for (var i = 0; i < newList.length; i++) {
    if (newList[i].selected) {
      allNum += parseInt(newList[i].num)
      console.log("allNum")
    }
  }
  console.log(allNum)
  that.setData({
    selectedNum: allNum
  })
}
// 合计金额
function count(that) {
  var newList = that.data.carts
  var newCount = 0
  for (var i = 0; i < newList.length; i++) {
    if (newList[i].selected) {
      newCount += (newList[i].num * newList[i].price * 100) / 100
    }
  }
  that.setData({
    totalPrice: newCount.toFixed(2)
  })
}

// 滑动系列
function getClientX(e) {  // 获取滑动的横坐标
  let touch = e.touches
  if (touch.length === 1) {
    return touch[0].clientX
  }
}
function touchE(e, dataList, startX, width) {  // touchend 更新列表数据
  let list = _resetData(dataList)
  let disX = _getEndX(e, startX)
  let left = 0

  if (disX < 0) {  // 判断滑动方向， （向左滑动）
    // 滑动的距离大于删除宽度的一半就显示操作列表 否则不显示
    Math.abs(disX) > width / 2 ? left = -width : left = 0
  } else {  // 向右滑动复位
    left = 0
  }

  list[_getIndex(e)].left = left
  return list
}
function _resetData(dataList) {  // 重置数据， 把所有的列表 left 置为 0
  for (let i in dataList) {
    dataList[i].left = 0
  }
  return dataList
}
function _getEndX(e, startX) {  // 获取滑动结束滑动的距离
  let touch = e.changedTouches
  if (touch.length === 1) {
    return touch[0].clientX - startX
  }
}
function _getIndex(e) {  // 获取滑动列表的下标值
  return e.currentTarget.dataset.index
}
