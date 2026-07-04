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

### 方式 1：GitHub Actions 自动部署（推荐，已配置）

仓库已配置 `.github/workflows/deploy-landing.yml`：

1. **触发条件**：推送形如 `v*` 的 tag（如 `v1.0.0.10`）时自动触发，与发版同步
2. workflow 会把整个 `landing/` 目录推送到 `${RELEASE_REPO}` 仓库的 `gh-pages` 分支（强制覆盖）
3. **首次启用**：到 release 仓 Settings → Pages → Source 选 `Deploy from a branch` → Branch `gh-pages` / `/ (root)` → Save
4. 几分钟后访问 `https://<release-repo-owner>.github.io/<release-repo-name>/`
5. 不打 tag 时,可在 Actions 页面手动 `workflow_dispatch` 触发部署

依赖的仓库变量与 secret（与打包 workflow 共用）：
- `vars.RELEASE_REPO` — 例如 `wuzhenmin/fapiao_assistant_release`
- `secrets.RELEASE_PAT` — 对 release 仓有 `contents:write` 权限的 PAT


### 方式 2：GitHub Pages 直接选源目录

如果不想走 Actions：把整个 `landing/` 目录 push 到一个公开仓库，Settings → Pages → Source 选对应分支与 `/landing` 目录即可。

### 方式 3：任意静态服务器

把 `landing/` 整个目录上传到任何静态托管（Netlify / Vercel / 阿里云 OSS / Nginx）即可。

### 方式 4：本地预览

```bash
cd landing
python3 -m http.server 8080
# 打开 http://localhost:8080
```

## 功能特性

- ✅ 自动识别访问者操作系统，高亮"推荐"版本（Windows / macOS）
- ✅ 微信 / QQ 内打开自动弹层提示用浏览器打开（GitHub 直链在微信内会被拦截）
- ✅ 移动端 / PC 自适应布局
- ✅ 下载链接、品牌名、版本号全部由 `config.js` 控制，修改无需重新构建
- ✅ 单纯静态资源，无任何后端依赖
