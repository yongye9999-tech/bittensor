Component({
  properties: {
    roomId: String,
  },
  data: {
    called: false,
  },
  methods: {
    onCall() {
      if (this.data.called) return;
      wx.showModal({
        title: '确认呼叫',
        content: '确定需要服务员帮助吗？',
        success: (res) => {
          if (res.confirm) {
            this.callService();
          }
        },
      });
    },
    callService() {
      const { roomId } = this.properties;
      wx.cloud.callFunction({
        name: 'callService',
        data: { roomId, time: new Date().toISOString() },
      }).then(res => {
        if (res.result.success) {
          this.setData({ called: true });
          wx.showToast({ title: '已呼叫', icon: 'success' });
          // 10秒后重置状态，可再次呼叫
          setTimeout(() => {
            this.setData({ called: false });
          }, 10000);
        }
      }).catch(err => {
        wx.showToast({ title: '呼叫失败', icon: 'none' });
      });
    },
  },
});
