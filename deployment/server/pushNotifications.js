// const webpush = require('web-push');
import webpush from 'web-push';

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webpush.setVapidDetails(
  'mailto:shlok845@gmail.com',
  publicVapidKey,
  privateVapidKey
);

async function sendPushNotification(subscription, payload) {
  await webpush.sendNotification(subscription, JSON.stringify(payload));
}

// module.exports = sendPushNotification;
export default sendPushNotification;
