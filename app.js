// app.js
// 替换成你的现有 WebPush AppKey
const webAppKey = "867a5b19d5b3f56f611c21e8";

// 点击订阅按钮时调用
async function subscribe() {
  if (!('serviceWorker' in navigator)) {
    alert("Service Worker not supported");
    return;
  }

  try {
    // 注册 Service Worker
    const registration = await navigator.serviceWorker.register('sw.js');
    console.log("Service Worker registered:", registration);

    // 请求通知权限
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      alert("Notification permission denied");
      return;
    }

    // 使用 EngageLab Web SDK 初始化 WebPush
    // SDK 会自动处理 subscription 和 VAPID，不需要自己填 applicationServerKey
    MTPushPrivatesApi.initWebPush(webAppKey)
      .then(subscription => {
        console.log("WebPush 订阅成功：", subscription);
        alert("订阅成功！Console 可查看 subscription");
      })
      .catch(err => {
        console.error("WebPush 订阅失败：", err);
        alert("订阅失败，查看 Console 日志");
      });

  } catch (err) {
    console.error("注册 Service Worker 或订阅失败：", err);
    alert("操作失败，查看 Console 日志");
  }
}
