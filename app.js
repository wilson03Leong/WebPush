const appkey = "867a5b19d5b3f56f611c21e8";

async function subscribe() {
  if (!('serviceWorker' in navigator)) {
    alert("Service Worker not supported");
    return;
  }

  try {
    // 注册 SW（必须）
    const registration = await navigator.serviceWorker.register('sw.js');
    console.log("Service Worker registered:", registration);

    // 初始化前先绑定事件（官方要求）
    MTpushInterface.mtPush.onDisconnect(function () {
      console.log("onDisconnect");
    });

    MTpushInterface.onMsgReceive((msgData) => {
      console.log("收到推送:", msgData);
    });

    // 初始化
    MTpushInterface.init({
      appkey: appkey,
      user_str: "wilson_test_user", // 随便填一个唯一用户ID

      success(data) {
        console.log("初始化成功:", data);
        alert("订阅成功！");
      },

      fail(err) {
        console.error("初始化失败:", err);
        alert("订阅失败，看 console");
      },

      webPushcallback(code, tip) {
        console.log("状态:", code, tip);
      },

      canGetInfo(data) {
        console.log("配置:", data);
        console.log("RegId:", MTpushInterface.getRegistrationID());
      },

      // 👉 关键：请求通知权限
      custom: (requestPermission) => {
        requestPermission();
      }
    });

  } catch (err) {
    console.error("错误:", err);
    alert("失败，查看 console");
  }
}
