# Evidence — propfirm-tv-video-factory

Updated: 2026-10-05

## Observed（实查）

| 声明 | 证据 |
|---|---|
| 七色 token | src/shared/theme.ts `export const C`（bg #05070A / blue #146EFF / white #F7F9FC / red #FF3B45 / muted #8B96A8 / yellow #FFC53D / orange #FF8A3D，另 panel/hairline 派生值） |
| 四类动效 | theme.ts 导出 fadeIn / fadeOut / slideUp / scaleIn / highlightShift（README 称四类，fadeOut 为 fadeIn 逆操作；Easing.out(Easing.cubic) 柔和无回弹） |
| 三级字体层级 | README 设计系统节 + theme.ts TITLE_EFFECT / CARD_TITLE_EFFECT |
| EpisodeConfig Schema 12 字段 | README Schema 节 + src/shared/types.ts |
| EP01 存在且 9 个 Shot | src/episodes/EP01/shots/Shot01-09.tsx |
| 脚手架自动生成清单 | README「创建新 Episode」节 + scripts/create-episode.mjs 存在 |
| 素材隔离 + 大文件 gitignore | README 素材管理节 + public/ 目录设计（clone 后无二进制，符合声明） |
| 技术栈 | README 技术栈节 + package.json（remotion、react 19） |

## Inferred（推断，附复核方式）

| 声明 | 复核方式 |
|---|---|
| EP01 全流程跑通（含渲染成片） | README + shots 结构完整；成片本体被 gitignore，复验=本地 npm run build:ep01 |
| HeyGen 数字人 / faster-whisper 对接可用 | README 自述技术栈；仓库内无这两者的代码（外部工具） |

## Unknown

- 渲染成片时长/质量指标（output/ 被 gitignore）
- 数字人视频本体（avatar_v2.webm 未入库）
