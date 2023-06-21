// service-worker.js
self.addEventListener('push', event => {
    const payload = event.data ? event.data.text() : 'Default Push Notification';
  
    event.waitUntil(
      self.registration.showNotification('Notification Title', {
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
  