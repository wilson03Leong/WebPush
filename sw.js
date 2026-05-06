// ✅ 交给 EngageLab SDK 的 sw 处理推送，这里不要重复监听 push 事件
// 如果你有自定义逻辑可以在这里加，但不要覆盖 push event

self.addEventListener('push', function(event) {
  const data = event.data.json();
  
  const title = data.title || '新消息';
  const options = {
    body: data.content || data.body || '',
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});
