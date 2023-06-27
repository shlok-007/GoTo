// service-worker.js
self.addEventListener('push', event => {
    var payload = event.data ? event.data.text() : 'Default Push Notification';
    // console.log(payload);
    // payload = "hello";
    // payload = toString(payload)+"yo";
    event.waitUntil(
      self.registration.showNotification('Companion Found!', {
        body: payload,
      })
    );
});
  
self.addEventListener('notificationclick', event => {
  event.notification.close();

  // Customize the action when the notification is clicked
  // For example, open a specific URL or navigate to a certain page
  event.waitUntil(
    clients.openWindow('https://www.youtube.com')
  );
});
  