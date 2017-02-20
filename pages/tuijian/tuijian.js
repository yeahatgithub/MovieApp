// pages/tuijian/tuijian.js
Page({
  data: {
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
      url: 'https://api.douban.com/v2/movie/top250',
      //访问豆瓣，Content-Type的写法比较特殊。写作：Content-Type: 'application/json'反而无法成功访问。
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {
        // console.log("访问豆瓣成功");
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
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },

  detail: function (event) {
    // console.log("Movie ID:", event.currentTarget.id);
    getApp().detail(event.currentTarget.id);
  }
})