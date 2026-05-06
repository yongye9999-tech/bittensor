const app = getApp();
Page({
  data: {
    userInfo: {},
    hasLogin: false,
  },
  onShow() {
    if (app.globalData.userInfo) {
      this.setData({ userInfo: app.globalData.userInfo, hasLogin: true });
    }
  },
  getUserProfile() {
    app.getUserInfo();
    // 通过回调设置
    app.userInfoReadyCallback = (userInfo) => {
      this.setData({ userInfo, hasLogin: true });
    };
  },
  goMyReservations() {
    // 可跳转到预约列表页，此处简单云函数查询展示
    wx.cloud.callFunction({ name: 'getReservations' }).then(res => {
      if (res.result.data) {
        // 实际项目中应跳转到预约列表页，这里用弹窗模拟
        wx.showModal({
          title: '预约记录',
          content: JSON.stringify(res.result.data),
          showCancel: false,
        });
      }
    });
  },
  goCoupons() {
    wx.showToast({ title: '暂无优惠券', icon: 'none' });
  },
  callService() {
    wx.makePhoneCall({ phoneNumber: '400-123-4567' });
  },
});
