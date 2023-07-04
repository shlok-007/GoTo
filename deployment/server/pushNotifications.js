const webpush = require('web-push');
// import webpush from 'web-push';

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webpush.setVapidDetails(
  'mailto:shlok845@gmail.com',
  publicVapidKey,
  privateVapidKey
);

function sendPushNotification(subscription, payload) {
  webpush.sendNotification(subscription, JSON.stringify(payload));
}

module.exports = sendPushNotification;
