// service-worker.js

self.addEventListener('push', event => {
  const payload = event.data ? event.data.json() : { name: '', destination: '', date: '', time: '' };
  let message;
  if(payload.dir === 'false' || payload.dir === false)
    message = `${payload.name} wishes to go to ${payload.destination} on ${payload.date} at ${payload.time}. Click here to get contact details!`;
  else
    message = `${payload.name} is returning from ${payload.destination} on ${payload.date} at ${payload.time}. Click here to get contact details!`
  const notificationOptions = {
    body: message,
    icon:"/icons/notification_icon.png",
    data: {
      destination: payload.destination,
      date: payload.date,
      time: payload.time,
      dir: payload.dir
    }
  };

  event.waitUntil(
    self.registration.showNotification('Companion Found!', notificationOptions)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();

  const payload = event.notification.data;
  const url = `https://goto-nine.vercel.app/showCompanions/${payload.destination}/${payload.date}/${payload.time}/${payload.dir}`;

  event.waitUntil(
    clients.openWindow(url)
  );
});
