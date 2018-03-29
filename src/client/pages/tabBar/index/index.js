var util = require('../../../utils/util.js')

var app = getApp();
// pages/tabBar/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curPage: 1,
    cellDatas: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.loadData(that, that.curPage);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh(),
      wx.showNavigationBarLoading(),
      this.loadData(1, function () {
        wx.hideNavigationBarLoading()
      })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showLoading({
      title: '加载更多中...'
    }),
      this.data.curPage++ ,
      this.loadData(this.data.curPage, function () { wx.hideLoading() })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '我在GIF字幕制作了好玩的表情，你也赶快进来玩吧~',
      path: 'pages/tabBar/index/index'
    }
  },

  bindCellVieWTap(b) {
    var index = b.currentTarget.dataset.idx;
    app.globalData.gifData = this.data.cellDatas[index];
    wx.navigateTo({
      url: '../../make/index'
    })
  },

  loadData(targetPage, callback) {
    var that = this;
    wx.request({
      url: 'https://gifmaker.develophelper.com/gif/category',
      method: "GET",
      success: function (res) {
        if (res == null ||
          res.data == null ||
          res.data.m != 0) {
          console.error(res);
          return;
        }

        that.setData({
          cellDatas: res.data.d,
          hidden: true
        });

        that.curPage = targetPage;

        if (callback) callback();
      }
    });
  }
})
