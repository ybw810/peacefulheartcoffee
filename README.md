# Peaceful Heart Coffee (peacefulheartcoffee.com)

> ⚡ **Powered by Gemini × Cloudflare Edge**
> Dedicated to Specialty Coffee Geeks worldwide.

Peaceful Heart Coffee 官方极客咖啡风味与萃取计算器，支持智能粉水比三向解算、分段注水精准计时、SCA 黄金杯萃取率罗盘、PWA 离线运行与微信官方社群（公众号/小程序）展位。

---

## 🌟 核心功能

1. **智能粉水比三向解算器**：
   - 咖啡粉量（Dose）、注水量（Water）、粉水比（1:n）任意调整其中两项，第三项自动实时平滑推算。
   - 微调步进按钮（$\pm 0.5\text{g}$，$\pm 5\text{g}$，$\pm 0.5$ 比例）。
2. **多器具与大师冲煮方案**：
   - 内置 V60、Kalita 蛋糕滤杯、爱乐压（AeroPress）、法压壶、冷萃冰滴、粕谷哲 4:6 法、Espresso 浓缩。
   - 预设研磨度建议（$\mu m$）与建议水温。
3. **专业分段萃取计时器**：
   - 毫秒级抗漂移计时（`performance.now()`），动态圆环注水进度条。
   - 自动计算各阶段注水里程碑（闷蒸、第一段、第二段、等待滴滤）。
   - **防熄屏模式**：基于 Screen Wake Lock API，冲煮过程中手机屏幕绝不自动熄灭。
   - **换段双和弦提示音**：基于 Web Audio API 纯合成和弦，无需网络下载音频文件，离线即响。
   - **触觉振动反馈**：阶段切换时触发移动端 Vibration API 振动提醒。
4. **SCA 黄金杯风味萃取罗盘**：
   - 支持手冲滴滤、浸润法压、意式浓缩。
   - 精确计算萃取率（EXT %）与实际粉水比。
   - 动态发光游标定位 SCA 18%–22% 黄金甜感平衡带，智能提供研磨度、水温与注水调整指导。
5. **官方微信公众号与小程序展位**：
   - 点击顶部或页脚的“官方社群”，弹出优雅的卡片展位。
   - 支持点击放大二维码大图与长按识别。
   - 官方二维码图片存放在 `assets/qr/official-account.png` 和 `assets/qr/mini-program.png`，替换文件即可随时更新。
6. **全功能渐进式 Web 应用 (PWA)**：
   - 桌面与移动端独立全屏运行，消除浏览器地址栏。
   - Service Worker 全量缓存，无网露营也能畅快使用。

---

## 🚀 本地开发与预览

在项目根目录下启动本地静态服务器：

```bash
# 使用 python
python3 -m http.server 8080

# 或使用 npx
npx serve .
```

浏览器打开 `http://localhost:8080` 即可体验。

---

## ☁️ Cloudflare Pages 部署与自定义域名绑定

### 1. 命令行一键部署
```bash
wrangler pages deploy . --project-name peacefulheartcoffee
```

### 2. 绑定新域名 `peacefulheartcoffee.com`
1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)。
2. 导航至 **Workers & Pages** -> 点击项目 **`peacefulheartcoffee`**。
3. 进入 **Custom Domains**（自定义域）选项卡。
4. 点击 **Set up a custom domain**，输入您的域名：
   - `peacefulheartcoffee.com`
   - `www.peacefulheartcoffee.com`
5. 点击确认，Cloudflare 将自动为您配置全球 DNS 解析并签发免费 SSL 证书。
