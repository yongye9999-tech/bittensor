// 封装云函数调用，统一错误处理
const callFunction = (name, data = {}) => {
  return wx.cloud.callFunction({ name, data })
    .then(res => {
      if (res.result && res.result.success !== false) {
        return res.result;
      } else {
        return Promise.reject(res.result);
      }
    })
    .catch(err => {
      wx.showToast({ title: '网络异常', icon: 'none' });
      return Promise.reject(err);
    });
};

module.exports = {
  callFunction,
};
