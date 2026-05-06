const cloudUtil = require('../../utils/cloud');
Page({
  data: {
    rooms: [],
  },
  onLoad() {
    this.loadRooms();
  },
  loadRooms() {
    cloudUtil.callFunction('getRoomList').then(res => {
      this.setData({ rooms: res.data || [] });
    }).catch(() => {
      // 降级显示示例数据
      this.setData({
        rooms: [
          { _id: '1', name: '迷你包厢', price: 88, tags: ['2-4人', '小聚'], image: '' },
          { _id: '2', name: '标准包厢', price: 128, tags: ['4-6人', '欢唱'], image: '' },
          { _id: '3', name: '豪华大包', price: 288, tags: ['8-12人', '聚会', '独立吧台'], image: '' },
        ],
      });
    });
  },
  onRoomSelect(e) {
    const room = e.detail.room;
    // 跳转到预约页并传递包厢类型
    wx.navigateTo({
      url: `/pages/reserve/reserve?roomId=${room._id}&roomName=${room.name}&price=${room.price}`,
    });
  },
});
