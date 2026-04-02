const webAppKey = "867a5b19d5b3f56f611c21e8";

// 初始化配置
const config = {
  appkey: webAppKey,
  user_str: "demo_user_" + Date.now(), // 用户唯一标识
  
  success: function(data) {
    console.log("✅ SDK初始化成功", data);
    document.getElementById('status').textContent = '状态：SDK已初始化';
  },
  
  fail: function(data) {
    console.error("❌ SDK初始化失败", data);
    document.getElementById('status').textContent = '状态：初始化失败';
  },
  
  canGetInfo: function(data) {
    // 订阅成功后的回调
    console.log("✅ 订阅成功，RegId:", MTpushInterface.getRegistrationID());
    console.log("完整数据:", data);
    document.getElementById('status').textContent = 
      '状态：已订阅 (RegId: ' + MTpushInterface.getRegistrationID() + ')';
    alert("订阅成功！");
  },
  
  webPushcallback: function(code, tip) {
    console.log("通知权限状态:", code, tip);
  }
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  
  // 按钮点击事件
  document.getElementById('subscribeBtn').addEventListener('click', function() {
    
    // 检查浏览器支持
    if (!('serviceWorker' in navigator)) {
      alert("你的浏览器不支持Service Worker");
      return;
    }
    
    if (!('PushManager' in window)) {
      alert("你的浏览器不支持Web Push");
      return;
    }
    
    // 初始化EngageLab SDK
    MTpushInterface.init(config);
  });
  
  // 监听推送消息
  MTpushInterface.onMsgReceive(function(res) {
    console.log("📩 收到推送消息:", res);
    alert("收到推送: " + JSON.stringify(res));
  });
});