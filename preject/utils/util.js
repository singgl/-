function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds();


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 登录判断
// 用户授权：没有用户授权，无论哪个页面都跳转到用户授权页面
// 手机号授权：没有手机号授权，所有页面都要到首页，弹出极速登录
// 用户凭证：没有用户凭证，所有页面跳转到短信注册页面
function isNeedLogin() {
  var userInfo = wx.getStorageSync('userInfo');//用户授权（用户授权后会有用户信息）
  var getMobiled = wx.getStorageSync('getMobiled');//用户手机号弹窗
  var token = wx.getStorageSync('token');//用户凭证

  var pages = getCurrentPages()    //获取加载的页面
  console.log(pages)
  var currentPage = pages[pages.length - 1]    //获取当前页面的对象
  var url = currentPage.route    //当前页面url
  if (token) {
    return false;
  }
  if (!userInfo) {
    console.log("!userInfo");
    wx.redirectTo({
      url: '/pages/yiguo/login/login',
    })
    return true;
  } else if (!getMobiled) {
    console.log("!getMobiled");
    wx.setStorageSync("showFastLogin2", true);
    wx.redirectTo({
      url: '/pages/yiguo/login/login',
    })
    return true;
  } else if (!token) {
    console.log("!token");
    wx.setStorageSync("showFastLogin2", false);
    wx.redirectTo({
      url: '/pages/yiguo/login/login',
    })
    return true;
  } else {
    console.log("normal");
    return false;
  }

  // if (!token) {
  //   if (userInfo){
  //     wx.setStorageSync("showFastLogin2", true);
  //     wx.reLaunch({
  //       url: '/pages/index/index',
  //     })
  //   }
  //   else{
  //     wx.reLaunch({
  //       url: '/pages/weixinlogin/weixinlogin'
  //     })
  //   }
  //   return true;
  // }
  // else {
  //   return false;
  // }
}

module.exports = {
  formatTime: formatTime,
  isNeedLogin: isNeedLogin
}
