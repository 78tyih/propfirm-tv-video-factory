# PropFirm.TV Video Factory

Calm Fintech Editorial 风格的可复用视频流水线，基于 Remotion 4.0 + React 19。

## 快速开始

```bash
# 安装依赖
npm install

# 启动 Remotion Studio 预览
npm run studio

# 渲染 EP01 成片
npm run build:ep01
```

## 创建新 Episode

```bash
npm run create -- --ep=EP02 --topic="How to Pass Evaluation"
```

脚手架会自动生成：
- `src/episodes/EP02/` — 配置、合成、示例 Shot、文稿模板
- `public/ep02/` — 素材目录
- 自动更新 `Root.tsx`、`episodes/index.ts`、`package.json`

## 从选题到成片的工作流

```
1. npm run create -- --ep=EP02 --topic="..."     # 脚手架生成骨架
2. 编辑 script.txt                                # 撰写口播文稿
3. 生成音频/数字人 → public/ep02/                  # TTS 或 HeyGen
4. 收集背景素材 → public/ep02/eagle/               # Eagle 资产库
5. 编辑 config.ts                                  # 填写 shots + subtitles
6. npm run studio                                  # 预览调试
7. npm run build:ep02                              # 渲染成片
```

## 目录结构

```
PropFirmTV-Video-Factory/
├── src/
│   ├── index.ts                    # Remotion 入口
│   ├── Root.tsx                    # 动态注册所有 Episode
│   ├── shared/                     # 共享设计系统
│   │   ├── theme.ts                # 色板/字体/动效函数
│   │   ├── types.ts                # EpisodeConfig Schema
│   │   └── components/
│   │       ├── AvatarCircle.tsx     # 数字人（参数化）
│   │       └── Subtitles.tsx        # 字幕（参数化）
│   └── episodes/
│       ├── index.ts                # Episode 注册表
│       └── EP01/
│           ├── config.ts           # EP01 全部配置数据
│           ├── Composition.tsx     # EP01 合成编排
│           ├── shots/Shot01-09.tsx  # 镜头组件
│           └── script.txt          # 口播文稿
├── public/
│   └── ep01/                        # EP01 素材（gitignore 排除）
│       ├── eagle/                   # 背景视频
│       ├── avatar_v2.webm           # 数字人视频
│       └── studio_dark_bg.jpg       # 工作室底板
├── scripts/
│   └── create-episode.mjs           # 脚手架 CLI
├── output/                          # 渲染产物（gitignore）
├── package.json
├── tsconfig.json
└── .gitignore
```

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

## Episode Config Schema

每集视频由一个 `config.ts` 完整定义：

```typescript
interface EpisodeConfig {
  id: string;              // 'EP01'
  title: string;
  compositionId: string;   // 'PropFirmTV-EP01'
  durationInFrames: number;
  fps: number;             // 30
  width: number;           // 1920
  height: number;          // 1080
  audioSrc: string;        // 'ep01/avatar_v2.webm'
  avatar: AvatarConfig;
  backgroundSrc?: string;
  shots: ShotConfig[];
  subtitles: SubtitleLine[];
}
```

## 素材管理

素材按 episode 隔离到 `public/epXX/`：
- `eagle/` — 背景视频（来自 Eagle 资产库）
- `avatar_v2.webm` — 数字人视频（HeyGen 生成）
- `studio_dark_bg.jpg` — 工作室底板

> 大型二进制文件被 `.gitignore` 排除，clone 后需手动放入素材。

## 技术栈

- Remotion 4.0 — React 视频渲染引擎
- React 19
- TypeScript 5.7
- HeyGen — 数字人生成
- faster-whisper — 字幕时间戳对齐
- Eagle — 资产管理
