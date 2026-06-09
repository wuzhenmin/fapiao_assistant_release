/**
 * 润金簿 · 落地页配置
 *
 * 部署说明：
 *   - 修改下方下载链接和版本号后保存即可，无需重新打包页面
 *   - 上线新版本时把 version + downloads.windows + downloads.macos 改成新地址
 *   - 也可以修改 brand / tagline / contact 等文案
 */
window.LANDING_CONFIG = {
  brand: '润金簿',
  brandEn: 'RUN JIN BU',
  tagline: '专为小微会计打造的发票凭证助手',
  subTagline: '一键导入发票 / 银行流水 / 回单，自动生成凭证、总账、明细账',
  version: 'v1.0.0.10',
  releaseDate: '2026-06-09',
  // 下载链接（替换为新版本时只需改这两行）
  downloads: {
    windows: 'https://github.com/wuzhenmin/fapiao_assistant_release/releases/download/v1.0.0.10/-windows.zip',
    macos:   'https://github.com/wuzhenmin/fapiao_assistant_release/releases/download/v1.0.0.10/-macos.zip',
  },
  // 所有版本入口（可选）
  releasesUrl: 'https://github.com/wuzhenmin/fapiao_assistant_release/releases',
  // 联系方式（可选）
  contact: {
    email: '',
    wechat: '',
  },
};
