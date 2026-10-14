# iot-demo

物联网设计与创新课程实践项目。基于 Node.js + Mosquitto（MQTT）的模拟传感器数据发布/订阅演示，并带有 Express 数据可视化网页。

## 文件说明

| 文件 | 作用 |
| --- | --- |
| `publisher.js` | 发布者：每 2 秒向 MQTT Broker 发布一条模拟温湿度数据；同时提供可视化网页 |
| `subscriber.js` | 订阅者：订阅主题并打印收到的数据 |
| `public/index.html` | 数据可视化网页（最新数值 + 折线图，自动刷新） |
| `.env.example` | 环境变量示例（复制为 `.env` 后按需修改） |

## 运行方法

前置条件：已安装 Node.js，Mosquitto 已在 1883 端口运行。

```bash
npm install
```

1. 启动订阅者（终端 1）：

   ```bash
   npm run sub
   ```

2. 启动发布者（终端 2）：

   ```bash
   npm run pub
   ```

3. 打开可视化网页：保持 `npm run pub` 运行，浏览器访问 <http://localhost:3000>

   - 网页显示 publisher 实际发布的最新温度、湿度和随时间变化的折线图；
   - 每 2 秒自动刷新，无需手动操作；
   - 尚无数据时显示"等待数据"。

## 验证记录

- 订阅者能实时收到发布者发送的 JSON 数据（时间戳一一对应）；
- 网页数值、折线图随发布数据自动更新，控制台无报错。
