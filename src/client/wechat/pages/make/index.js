var app = getApp();
// index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalHidden: true,
    gifData: {
      gifDemoUrl: '',
      gifType: 0,
      contents: ['第一句']
    },
    newGifContents: [],
    qualityItems: [
      { name: '0', value: '偏低' },
      { name: '1', value: '标准', checked: 'true' },
      { name: '2', value: '偏高' }
    ],
    quality: 1,
    gifImgSrc: '',
    gifUrl: '',
    downloadStatus: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var gifData = app.globalData.gifData;
    var newContents = gifData.contents.split('##$@?$?@$##');
    this.setData({
      gifData: {
        gifDemoUrl: gifData.gifDemoUrl,
        gifType: gifData.gifType,
        contents: newContents
      },
      newGifContents: newContents
    })
  },

  bindGifImageTap(event) {
    wx.previewImage(
      { urls: [event.currentTarget.dataset.src] }
    )
  },

  bindModalGifImageTap(event) {
    wx.previewImage(
      { urls: [this.data.downloadStatus == 0 ? this.data.gifImgSrc : event.currentTarget.dataset.src] }
    )
  },

  bindMakeupBtnTap() {
    var that = this;
    that.makeupGif((a) => {
      // ws: wx.navigateTo({
      //   url: '../preview/preview?url=' + a.gifUrl
      // })
      this.setData({
        gifUrl: a.gifurl,
        modalHidden: false
      });
    })
  },

  bindInput(event) {
    var detail = event.detail.value;
    var index = event.currentTarget.dataset.index;
    this.data.newGifContents[index] = detail;
  },

  bindRadioChange(event) {
    this.data.quality = parseInt(event.detail.value)
  },

  bindHelpTap() {
    wx.showToast({
      title: 'GIF质量越高,体积越大,消耗流量越高', icon: 'none'
    })
  },

  makeupGif(callback) {
    wx.showLoading({ title: '正在生成中...' }),
      wx.request({
        url: 'https://gifmaker.develophelper.com/gif/make',
        method: 'POST',
        data: {
          from: 1,
          tplid: this.data.gifData.gifType,
          quality: this.data.quality,
          content: this.data.newGifContents.join('##$@?$?@$##')
        },
        header: {
          "content-type": 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          wx.hideLoading();
          if (res.data.m == 0)
            callback(res.data.d);
          else
            wx.showToast({ title: '服务器暂时很忙哟, 等等再试吧', icon: 'none' });
        },
        fail: function () {
          wx.hideLoading();
          wx.showToast({ title: '服务器暂时很忙哟, 等等再试吧', icon: 'none' });
        }
      })
  },
  onSaveClick: function (event) {
    var that = this;
    if (that.data.downloadStatus == 0) {
      wx.previewImage(
        { urls: [that.data.gifImgSrc] }
      );
    }
    else {
      wx.showLoading({ title: '正在下载中...' });
      wx.downloadFile({
        url: that.data.gifUrl,
        type: 'image',
        success: function (res) {
          wx.hideLoading();
          wx.showToast({ title: '图片已成功下载', icon: 'none' });
          that.setData({
            gifImgSrc: res.tempFilePath,
            downloadStatus: 0
          });
        },
        fail: function (res) {
          wx.hideLoading();
          wx.showToast({ title: '下载失败，请重试', icon: 'none' });
        },
      });
    }
  },

  onCancelClick: function (event) {
    this.setData({ modalHidden: true });
  }
})