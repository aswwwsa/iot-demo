require('dotenv').config();
const mqtt = require('mqtt');
const express = require('express');
const path = require('path');

const url = process.env.MQTT_URL || 'mqtt://localhost:1883';
const topic = process.env.TOPIC || 'iot/demo/temperature';
const PORT = process.env.PORT || 3000;

// 保存最近发布的数据（最多 50 条），供网页查询
const history = [];
const MAX_HISTORY = 50;

const client = mqtt.connect(url, {
  username: process.env.MQTT_USERNAME || undefined,
  password: process.env.MQTT_PASSWORD || undefined,
});

client.on('connect', () => {
  console.log('[PUB] Connected:', url);

  // 模拟设备上报温度（原有发布功能，保持不变）
  setInterval(() => {
    const data = {
      deviceId: 'sensor-001',
      ts: Date.now(),
      temperature: (20 + Math.random() * 5).toFixed(2),
      humidity: (40 + Math.random() * 10).toFixed(2),
    };
    const payload = JSON.stringify(data);
    client.publish(topic, payload, { qos: 0 }, (err) => {
      if (err) {
        console.error('[PUB] Publish error:', err.message);
      } else {
        console.log('[PUB] Sent:', payload);
        // 发布成功后，把同一份数据存入历史，网页显示的就是实际发布的数据
        history.push(data);
        if (history.length > MAX_HISTORY) history.shift();
      }
    });
  }, 2000);
});

client.on('error', (err) => console.error('[PUB] Error:', err.message));

// ---- Express 可视化网页 ----
const app = express();

// 数据接口：返回 publisher 实际发布过的数据
app.get('/api/data', (req, res) => {
  res.json(history);
});

// 静态页面（public/index.html）
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`[WEB] 可视化页面: http://localhost:${PORT}`);
});
