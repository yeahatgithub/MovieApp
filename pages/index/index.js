//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    movies: []
  },
  onLoad: function (options) {
    wx.showToast({
      title: '正在获取影片信息...',
      icon: 'loading',
      duration: 10000
    })

    this.loadMovies();
  },

  loadMovies: function () {
    var page = this;
    wx.request({
      url: 'https://api.douban.com/v2/movie/in_theaters',
      //访问豆瓣，Content-Type的写法比较特殊。写作：Content-Type: 'application/json'反而无法成功访问。
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {
        // console.log("访问豆瓣成功", res);
        wx.hideToast();
        page.setData({
          movies: res.data.subjects
        })
      },
      fail: function () {
        console.log("访问豆瓣失败")
      },
      complete: function () {
        // complete
      }
    })
  },

  detail: function (event) {
    // console.log("Movie ID:", event.currentTarget.id);
    getApp().detail(event.currentTarget.id);
  }
})
