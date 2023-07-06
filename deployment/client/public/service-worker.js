// service-worker.js

self.addEventListener('push', event => {
  const payload = event.data ? event.data.json() : { name: '', destination: '', date: '', time: '' };

  const notificationOptions = {
    body: `${payload.name} wishes to go to ${payload.destination} on ${payload.date} at ${payload.time}. Click here to get contact details!`,
    icon:"/icons/notification_icon.png",
    data: {
      destination: payload.destination,
      date: payload.date,
      time: payload.time
    }
  };

  event.waitUntil(
    self.registration.showNotification('Companion Found!', notificationOptions)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();

  const payload = event.notification.data;
  const url = `http://localhost:3000/showCompanions/${payload.destination}/${payload.date}/${payload.time}`;

  event.waitUntil(
    clients.openWindow(url)
  );
});
