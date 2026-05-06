const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();

exports.main = async () => {
  try {
    const res = await db.collection('rooms').where({ status: 'available' }).get();
    return { success: true, data: res.data };
  } catch (e) {
    console.error(e);
    return { success: false, data: [] };
  }
};
