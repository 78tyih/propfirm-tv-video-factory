# PropFirm.TV Video Factory

> **一句话**：Calm Fintech Editorial 风格的可复用视频流水线——一条命令脚手架新集，设计系统全片统一，选题进成片出。
>
> **展示页**：https://78tyih.github.io/propfirm-tv-video-factory/showcase.html （含色板 / 动效 / Schema 图解）

| | |
|---|---|
| 类型 | Remotion 4.0 + React 19 视频 Episode 工厂 |
| 状态 | EP01（9 Shot）全流程跑通 |
| 产物 | 1920×1080 @ 30fps 成片（数字人口播 + 背景 + 字幕） |

## ① 解决什么问题

系列金融短视频每集都从零搭：风格漂移、素材乱放、配置散落。工厂把骨架、设计系统、素材隔离、注册机制全部固化——新集只填内容。

## ② 什么场景 → 什么结果

从选题到成片的七步：

```text
1. npm run create -- --ep=EP02 --topic="..."     # 脚手架生成骨架
2. 编辑 script.txt                                # 撰写口播文稿
3. 生成音频/数字人 → public/ep02/                  # TTS 或 HeyGen
4. 收集背景素材 → public/ep02/eagle/               # Eagle 资产库
5. 编辑 config.ts                                  # 填写 shots + subtitles
6. npm run studio                                  # 预览调试
7. npm run build:ep02                              # 渲染成片
```

## ③ 什么结构

```text
src/
  ├── index.ts                    # Remotion 入口
  ├── Root.tsx                    # 动态注册所有 Episode
  ├── shared/                     # 共享设计系统
  │   ├── theme.ts                # 色板/字体/动效函数
  │   ├── types.ts                # EpisodeConfig Schema
  │   └── components/
  │       ├── AvatarCircle.tsx    # 数字人（参数化）
  │       └── Subtitles.tsx       # 字幕（参数化）
  └── episodes/
      ├── index.ts                # Episode 注册表
      └── EP01/                   # config + shots/Shot01-09 + script.txt
public/epXX/                      # 素材按集隔离（eagle/ · avatar · 底板）
scripts/create-episode.mjs        # 脚手架 CLI
```

每集由一个 `config.ts` 完整定义（EpisodeConfig：id / title / compositionId / duration / fps 30 / 1920×1080 / audioSrc / avatar / shots / subtitles）。

## ④ 能复用什么

- **Episode 工厂模式**：脚手架 + 注册表 + config 数据驱动，适用于任何 Remotion 系列视频
- **Calm Fintech Editorial 设计系统**：七色 token + 三级字体层级 + 仅四类动效（Fade / Slide Up / Scale In / Highlight Shift，柔和无回弹）
- **参数化组件**：AvatarCircle 数字人 + Subtitles 字幕
- **素材隔离约定**：public/epXX/（eagle/ 背景 · avatar_v2.webm · 底板），大文件 .gitignore

## 设计系统

### 色板

| Token | Hex | 用途 |
|-------|-----|------|
| bg | #05070A | 主黑·背景 |
| panel | rgba(10,14,22,0.78) | 卡片深色半透明底 |
| white | #F7F9FC | 主文字 |
| blue | #146EFF | 强调/品牌 |
| red | #FF3B45 | 警示/否定 |
| muted | #8B96A8 | 副文字 |
| yellow | #FFC53D | 字幕强调·黄 |
| orange | #FF8A3D | 字幕强调·橙（风险类） |

### 动效（仅 4 类，柔和无回弹）

- **Fade** — `fadeIn(frame, start, dur)`
- **Slide Up** — `slideUp(frame, start, dur, dist)`
- **Scale In** — `scaleIn(frame, start, dur, from)`
- **Highlight Shift** — `highlightShift(frame, start, end, ramp)`

### 字体层级

- A 级主标题：60-72px，描边 + 轻阴影
- B 级卡片标题：23-30px，清晰描边，当前卡片高亮
- C 级辅助说明：16-20px，灰蓝小号

## 快速开始

```bash
npm install
npm run studio      # Remotion Studio 预览
npm run build:ep01  # 渲染 EP01 成片
```

> 大型二进制素材被 `.gitignore` 排除，clone 后需手动放入 `public/epXX/`。

## 技术栈

Remotion 4.0 · React 19 · TypeScript 5.7 · HeyGen（数字人）· faster-whisper（字幕对齐）· Eagle（资产管理）
