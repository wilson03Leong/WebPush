self.addEventListener('push', function(event) {
  console.log('Push received:', event);

  self.registration.showNotification('Test Notification', {
    body: 'Push received successfully!',
  });
});
