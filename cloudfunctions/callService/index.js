const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();

exports.main = async (event) => {
  const { roomId, time } = event;
  if (!roomId) return { success: false, message: '缺少房间号' };

  try {
    // 记录服务呼叫，并可发送模板消息或通知管理员
    await db.collection('service_calls').add({
      data: {
        roomId,
        time: time || new Date().toISOString(),
        status: 'pending',
        handled: false,
      },
    });

    // 这里可以调用云函数发送订阅消息给服务员端（如需）

    return { success: true, message: '已呼叫' };
  } catch (e) {
    console.error(e);
    return { success: false, message: '呼叫失败' };
  }
};
