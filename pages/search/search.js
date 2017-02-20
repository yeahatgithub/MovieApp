Page({
    data: {
        searchKey: "",
        movies:[]
    },

    keyInput: function(event){
        this.setData({
            searchKey: event.detail.value
        })
    },
    search: function(event){
        var page = this;
        var searchKey = page.data.searchKey;
        if (searchKey == "") {
            wx.showToast({
                title: "必须输入关键字",
                duration: 1000
            })
            return;
        }
        wx.showToast({
            title: '搜索中...',
            icon: 'loading',
            duration: 30000
        })
        wx.request({
          url: 'https://api.douban.com/v2/movie/search?q=' + searchKey,
          data: {},
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
              'Content-Type': 'json'
          }, // 设置请求的 header
          success: function(res){
            wx.hideToast();
            page.setData({
                movies: res.data.subjects
            })
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
    },

    detail: function (event) {
        // console.log("Movie ID:", event.currentTarget.id);
        getApp().detail(event.currentTarget.id);
    }
})