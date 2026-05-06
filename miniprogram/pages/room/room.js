Page({
  data: {
    roomId: '',
    roomName: '豪华包厢',
    roomCode: 'A001',
    volume: 50,
    airconTemp: 24,
    lightOn: true,
    airconOn: true,
    songList: [
      { name: '十年', artist: '陈奕迅', isNew: false },
      { name: '告白气球', artist: '周杰伦', isNew: true },
      { name: '后来', artist: '刘若英', isNew: false },
    ],
  },
  onLoad(options) {
    // 通常由扫描二维码带参进入，如 roomId=xxx&code=A001
    if (options.roomId) {
      this.setData({
        roomId: options.roomId,
        roomCode: options.code || '001',
        roomName: options.name || '包厢',
      });
    }
  },
  toggleLight() {
    this.setData({ lightOn: !this.data.lightOn });
    wx.showToast({ title: this.data.lightOn ? '灯光已开启' : '灯光已关闭', icon: 'none' });
  },
  adjustVolume() {
    let vol = this.data.volume + 10;
    if (vol > 100) vol = 0;
    this.setData({ volume: vol });
    wx.showToast({ title: `音量 ${vol}%`, icon: 'none' });
  },
  toggleAircon() {
    this.setData({ airconOn: !this.data.airconOn });
    wx.showToast({ title: this.data.airconOn ? '空调已开启' : '空调已关闭', icon: 'none' });
  },
});
