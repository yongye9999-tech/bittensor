App({
  onLaunch: function () {
    // 初始化云开发
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: 'your-env-id', // 替换为你的云环境ID
        traceUser: true,
      });
    }
    this.globalData = {
      userInfo: null,
    };
  },
  getUserInfo: function () {
    // 简单获取用户信息，实际项目可使用云函数获取 openid
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        this.globalData.userInfo = res.userInfo;
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res.userInfo);
        }
      },
    });
  },
});
