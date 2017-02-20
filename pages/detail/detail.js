Page({
  data:{
    movieId:'',
    title: '',
    imageUrl: '',
    summary: '',
    rate: '',
    year: '',
    directors: '',
    countries: '',
    cast_names: '',
    genres: '',
    casts: []
  },
  onLoad:function(options){
      // console.log("detail.onLoad()", options);
    // 生命周期函数--监听页面加载
    this.setData({
        movieId: options.id
    })
    this.loadMovie(options.id);
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    // String3
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
    // String4
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
    // String5
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
    // String6
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    // String7
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
    // String8
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  },

  loadMovie: function(movieId){
    var page = this;
    wx.request({
      url: 'https://api.douban.com/v2/movie/subject/' + movieId,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'Content-Type': 'json'
      },
      success: function(res){
        console.log("获取影片详情成功...", res.data);
        var strDirectors = '';
        if (res.data.directors.length > 0){
          strDirectors = res.data.directors[0].name;
          for (var i = 1; i < res.data.directors.length; i++){
            strDirectors += " / " + res.data.directors[i].name;
          }
        }
        
        var strCountries = '';
        if (res.data.countries.length > 0){
          strCountries = res.data.countries[0];
          for (var i = 1; i < res.data.countries.length; i++){
            strCountries += " / " + res.data.countries[i];
          }
        }
        
        var strCasts = '';
        if (res.data.casts.length > 0){
          strCasts = res.data.casts[0].name;
          for (var i = 1; i < res.data.casts.length; i++)
            strCasts += " / " + res.data.casts[i].name;
        }

        var strGenres = '';
        if (res.data.genres.length > 0){
          strGenres = res.data.genres[0];
          for (var i = 1; i < res.data.genres.length; i++)
            strGenres += " / " + res.data.genres[i];
        }
        page.setData({
          movieId: movieId,
          title: res.data.title,
          imageUrl: res.data.images.large,
          summary: res.data.summary,
          rate: res.data.rating.average,
          year: res.data.year,
          directors: strDirectors,
          countries: strCountries,
          cast_names: strCasts,
          genres: strGenres,
          casts: res.data.casts
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }
})