const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const { roomId, roomName, date, time, contactName, phone } = event;

  // 简单校验
  if (!roomId || !date || !time || !contactName || !phone) {
    return { success: false, message: '参数不完整' };
  }

  try {
    // 检查是否冲突（简化：同包厢同日期时间段）
    const conflict = await db.collection('reservations')
      .where({
        roomId,
        date,
        time,
        status: 'confirmed',
      })
      .count();

    if (conflict.total > 0) {
      return { success: false, message: '该时段已被预约' };
    }

    const result = await db.collection('reservations').add({
      data: {
        openid: wxContext.OPENID,
        roomId,
        roomName,
        date,
        time,
        contactName,
        phone,
        status: 'confirmed',
        createTime: new Date(),
      },
    });

    return { success: true, data: result._id };
  } catch (e) {
    console.error(e);
    return { success: false, message: '预约失败' };
  }
};
