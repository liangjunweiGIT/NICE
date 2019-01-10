// pages/secret/secret.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    details: '    ',
    write_hiddenn:true,
    list_hiddenn:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.show_list();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  // 下拉刷新
  onPullDownRefresh: function () {
    this.show_list();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  bindTextAreaBlur: function (e) {
    this.setData({
      details: e.detail.value
    });
  },

  to_write: function () {
    this.setData({
      write_hiddenn: false,
      list_hiddenn: true
    });
  },

  to_list: function () {
    this.setData({
      write_hiddenn: true,
      list_hiddenn: false
    });
    this.show_list();
  },

  show_list: function () {
    var that = this;
    this.onLoad;
    //隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    wx.request({
      url: 'https://www.liuxsong.com/secretController/getSecretList',
      method: "GET",
      header: {
        'content-type': 'application/text'
      },
      data:{start:0 ,end:30},
      success: function (res) {
        // 设置数组元素
        that.setData({
          list: res.data
        });
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    })
  },

  to_save: function () {
    var that = this;
    wx.showLoading({
      title: '文字上传中',
    })
    console.log("save:"+this.data.details)
    wx.request({
      //url: 'http://localhost:8080/secretController/insertSecret?',
      url: 'https://www.liuxsong.com/secretController/insertSecret?',
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      method: "POST",
      data: {secretText:this.data.details},
      success: function (res) {
        console.log(res)
        if(res.data.status==0){
          return;
        }
        // 设置数据
        that.setData({
          details: "    "
        })
        // 隐藏加载框
        wx.hideLoading();
      }
    })

    this.to_list();
  }
})