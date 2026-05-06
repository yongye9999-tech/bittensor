const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  try {
    const res = await db.collection('reservations')
      .where({ openid: wxContext.OPENID })
      .orderBy('createTime', 'desc')
      .get();
    return { success: true, data: res.data };
  } catch (e) {
    console.error(e);
    return { success: false, data: [] };
  }
};
