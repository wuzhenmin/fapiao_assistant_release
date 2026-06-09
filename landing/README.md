# 润金簿 · 落地页 (H5)

用于分享给他人下载润金簿应用的功能介绍 H5 页面，支持 Windows / macOS 下载入口。

## 文件结构

```
landing/
├── index.html        页面结构
├── styles.css        样式（电蓝渐变 + 浅色科技主题）
├── app.js            脚本（系统识别 / 微信内打开提示）
├── config.js         ⭐ 下载链接配置（修改这里即可）
├── README.md         本文档
└── assets/
    └── app.png       应用图标
```

## 修改下载链接（最常用）

只需要编辑 `config.js`：

```js
window.LANDING_CONFIG = {
  ...
  version: 'v1.0.0.10',
  releaseDate: '2026-06-09',
  downloads: {
    windows: 'https://github.com/.../v1.0.0.10/-windows.zip',
    macos:   'https://github.com/.../v1.0.0.10/-macos.zip',
  },
  ...
};
```

修改保存后刷新页面即可生效，无需重新打包。

## 部署方式

### 方式 1：GitHub Pages（推荐）

1. 把整个 `landing/` 目录 push 到一个公开仓库（可以放在 release repo）
2. 仓库 Settings → Pages → Source 选 main 分支 + `/landing` 目录
3. 几分钟后访问 `https://<user>.github.io/<repo>/landing/`

### 方式 2：任意静态服务器

把 `landing/` 整个目录上传到任何静态托管（Netlify / Vercel / 阿里云 OSS / Nginx）即可。

### 方式 3：本地预览

```bash
cd fapiao_assistant/landing
python3 -m http.server 8080
# 打开 http://localhost:8080
```

## 功能特性

- ✅ 自动识别访问者操作系统，高亮"推荐"版本（Windows / macOS）
- ✅ 微信 / QQ 内打开自动弹层提示用浏览器打开（GitHub 直链在微信内会被拦截）
- ✅ 移动端 / PC 自适应布局
- ✅ 下载链接、品牌名、版本号全部由 `config.js` 控制，修改无需重新构建
- ✅ 单纯静态资源，无任何后端依赖
