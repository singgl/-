function appRequest(bler, url, data, callback, errFun) {
  wx.request({
    url: url,
    method: "POST",
    header: {
      // 'content-type': 'application/json' 
      'content-type': bler ? 'application/json' : 'application/x-www-form-urlencoded' 
       
    },
    dataType: 'json',
    data: data || '',
    success: function (res) {
      callback(res.data);
    },
    fail: function (err) {
      errFun(err);
    }
  })
}
function appGetRequest(url, callback, errFun) {
  wx.request({
    url: url,
    method: "GET",
    success: function (res) {
      callback(res.data);
    },
    fail: function (err) {
      errFun(err);
    }
  })
}


module.exports = {
  appRequest: appRequest,
  appGetRequest: appGetRequest
}