Component({
  // 自定义组件属性列表
  properties: {
    orderId: String,
    showInvoice: {
      type: Boolean,
      value: false,
      observer: function (newVal, oldVal, changedPath) {    //showInvoice值改变是触发的函数
        let {orderId} = this.data
        console.log(newVal,"==================")
        console.log(oldVal,"==================")
        console.log(changedPath,"==================")
        console.log(orderId,"==================")
        console.log(this.data,"==================")
      }
    },
  },
  lifetimes:{
    attached() {
      console.log("哈啊哈1")
    },
    detached () {
      console.log("我离开了")
    },
    created () {
      console.log("我触发了")
    }
  },
  // 被lifetimes里覆盖掉了无效
  attached() { 
    console.log("哈啊哈2")
  }, 
  // 组件初始数据
  data:{

  },
  // 组件方法列表
  methods:{
    // 关闭弹窗
    actionSheetbindchange: function () {
      this.setData({
        showInvoice: !this.data.showInvoice
      })
      console.log("haha ", this.data.showInvoice)
      //调用父组件中关闭方法
      this.triggerEvent('closeInvoice', {})
    },
  }
})