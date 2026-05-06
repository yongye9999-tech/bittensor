const cloudUtil = require('../../utils/cloud');
const util = require('../../utils/util');

Page({
  data: {
    roomId: '',
    roomName: '',
    price: '',
    date: '',
    timeIndex: [0, 0],
    timeRange: [
      ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],
      ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],
    ],
    selectedTime: '',
    contactName: '',
    phone: '',
  },
  onLoad(options) {
    this.setData({
      roomId: options.roomId || '',
      roomName: options.roomName || '',
      price: options.price || '',
      date: util.formatDate(new Date()),
    });
    // 默认选中第一个开始时间，结束时间为下一个小时
    this.setTimeSelection([0, 1]);
  },
  onDateChange(e) {
    this.setData({ date: e.detail.value });
  },
  onTimeChange(e) {
    const idx = e.detail.value;
    this.setTimeSelection(idx);
  },
  onColumnChange(e) {
    // 保证结束时间大于开始时间
    if (e.detail.column === 0) {
      let startIdx = e.detail.value;
      let endIdx = this.data.timeIndex[1];
      if (endIdx <= startIdx) {
        endIdx = startIdx + 1;
        if (endIdx >= this.data.timeRange[1].length) endIdx = this.data.timeRange[1].length - 1;
        this.setData({ 'timeIndex[1]': endIdx });
      }
    }
  },
  setTimeSelection(idx) {
    const start = this.data.timeRange[0][idx[0]];
    const end = this.data.timeRange[1][idx[1]];
    this.setData({
      timeIndex: idx,
      selectedTime: `${start} - ${end}`,
    });
  },
  onInputName(e) { this.setData({ contactName: e.detail.value }); },
  onInputPhone(e) { this.setData({ phone: e.detail.value }); },
  submitReservation() {
    const { roomId, roomName, date, selectedTime, contactName, phone } = this.data;
    if (!contactName || !phone) {
      wx.showToast({ title: '请填写完整信息', icon: 'none' });
      return;
    }
    if (!/^1\d{10}$/.test(phone)) {
      wx.showToast({ title: '手机号格式不正确', icon: 'none' });
      return;
    }
    wx.showLoading({ title: '预约中' });
    cloudUtil.callFunction('createReservation', {
      roomId,
      roomName,
      date,
      time: selectedTime,
      contactName,
      phone,
    }).then(res => {
      wx.hideLoading();
      wx.showToast({ title: '预约成功', icon: 'success' });
      setTimeout(() => {
        wx.switchTab({ url: '/pages/user/user' });
      }, 1500);
    }).catch(err => {
      wx.hideLoading();
      wx.showToast({ title: err.message || '预约失败', icon: 'none' });
    });
  },
});
