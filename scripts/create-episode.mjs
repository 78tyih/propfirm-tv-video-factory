#!/usr/bin/env node
/* ════════════════════════════════════════════════════════════════
 * PropFirm.TV Episode 脚手架 CLI
 *
 * 用法：
 *   npm run create -- --ep=EP02 --topic="How to Pass Evaluation"
 *
 * 产出：
 *   src/episodes/EP02/config.ts      配置模板
 *   src/episodes/EP02/Composition.tsx 合成模板
 *   src/episodes/EP02/shots/Shot01.tsx 示例 Shot
 *   src/episodes/EP02/script.txt     文稿模板
 *   public/ep02/                     素材目录（.gitkeep）
 *   src/Root.tsx                     自动更新（添加 Composition 注册）
 *   src/episodes/index.ts            自动更新（添加 import + 数组项）
 *   package.json                     自动更新（添加 build:ep02 脚本）
 * ════════════════════════════════════════════════════════════════ */

import { mkdir, writeFile, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ── 参数解析 ───────────────────────────────────────
function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = { ep: null, topic: null };
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--ep=')) parsed.ep = args[i].slice(5);
    else if (args[i] === '--ep') parsed.ep = args[++i];
    else if (args[i].startsWith('--topic=')) parsed.topic = args[i].slice(8);
    else if (args[i] === '--topic') parsed.topic = args[++i];
  }
  if (!parsed.ep) {
    console.error('用法: npm run create -- --ep=EP02 --topic="How to Pass Evaluation"');
    process.exit(1);
  }
  if (!parsed.topic) parsed.topic = 'TODO: 填写选题';
  return parsed;
}

const { ep, topic } = parseArgs();
const epLower = ep.toLowerCase();
const epDir = join(ROOT, 'src', 'episodes', ep);
const publicDir = join(ROOT, 'public', epLower);

// ── 生成 config.ts ─────────────────────────────────
const configTs = `import type { EpisodeConfig } from "../../shared/types";

/* ════════════════════════════════════════════════════════════════
 * ${ep} · "${topic}"
 *
 * TODO: 填写以下内容后删除 TODO 标记
 * 1. durationInFrames — 根据音频实际时长计算 (秒 × 30)
 * 2. audioSrc — 音频/数字人素材路径
 * 3. avatar — 数字人配置
 * 4. shots — 镜头列表（参考 EP01）
 * 5. subtitles — 字幕数据（帧时间戳 @30fps）
 * ════════════════════════════════════════════════════════════════ */

export const ${epLower}Config: EpisodeConfig = {
  id: '${ep}',
  title: '${topic}',
  description: 'TODO: 简介',
  compositionId: 'PropFirmTV-${ep}',

  durationInFrames: 1500, // TODO: 根据音频时长调整
  fps: 30,
  width: 1920,
  height: 1080,

  audioSrc: '${epLower}/avatar.webm', // TODO: 音频路径

  avatar: {
    src: '${epLower}/avatar.webm',
    circleSize: 350,
    visible: true,
  },

  backgroundSrc: '${epLower}/studio_dark_bg.jpg',

  // TODO: 设计镜头列表
  // 参考 EP01 的 9 镜头结构：Hook → 背景 → 核心观点 → 举例 → 总结 → 预告
  shots: [
    { id: 'shot01', from: 0, durationInFrames: 120, component: 'Shot01' },
    // { id: 'shot02', from: 120, durationInFrames: 150, component: 'Shot02' },
    // ...
  ],

  // TODO: 字幕（帧 @30fps）
  subtitles: [
    { start: 0, end: 120, zh: 'TODO: 中文字幕', en: 'TODO: English', highlights: [] },
  ],
};
`;

// ── 生成 Composition.tsx ──────────────────────────
const compositionTx = `import React from "react";
import { AbsoluteFill, useCurrentFrame, Audio, Sequence, staticFile, Img } from "remotion";
import { Shot01 } from "./shots/Shot01";
// TODO: 新增 Shot 时在此 import
import { AvatarCircleFrame } from "../../shared/components/AvatarCircle";
import { Subtitles } from "../../shared/components/Subtitles";
import { ${epLower}Config } from "./config";

const SHOT_COMPONENTS: Record<string, React.FC> = {
  Shot01,
  // TODO: 新增 Shot 时在此注册
};

export const ${ep}Video: React.FC = () => {
  const frame = useCurrentFrame();
  const config = ${epLower}Config;

  return (
    <AbsoluteFill style={{ backgroundColor: "#05070A" }}>
      {config.backgroundSrc && (
        <Img
          src={staticFile(config.backgroundSrc)}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.5)",
          }}
        />
      )}

      <Audio src={staticFile(config.audioSrc)} />

      {config.shots.map((shot) => {
        const Component = SHOT_COMPONENTS[shot.component];
        if (!Component) return null;
        return (
          <Sequence key={shot.id} from={shot.from} durationInFrames={shot.durationInFrames}>
            <Component />
          </Sequence>
        );
      })}

      <AvatarCircleFrame frame={frame} config={config.avatar} />
      <Subtitles frame={frame} data={config.subtitles} />
    </AbsoluteFill>
  );
};
`;

// ── 生成 Shot01.tsx 模板 ──────────────────────────
const shot01Tx = `import React from "react";
import { AbsoluteFill, useCurrentFrame, OffthreadVideo, staticFile, interpolate } from "remotion";
import { C, FONT, TITLE_EFFECT, fadeIn, slideUp } from "../../../shared/theme";

/* ════════════════════════════════════════════════════════════════
 * ${ep} Shot01 · 开场 Hook
 * TODO: 替换背景视频、标题文案、动效参数
 * ════════════════════════════════════════════════════════════════ */

export const Shot01: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = fadeIn(frame, 8, 20);
  const yOffset = slideUp(frame, 8, 24, 24);

  return (
    <AbsoluteFill style={{ overflow: "hidden", fontFamily: FONT }}>
      {/* TODO: 替换背景视频 */}
      <OffthreadVideo
        src={staticFile("${epLower}/eagle/TODO_background.mp4")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        muted
      />

      {/* 暗色 overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(160deg, rgba(5,7,10,0.75) 0%, rgba(8,12,20,0.5) 50%, rgba(5,7,10,0.8) 100%)",
        }}
      />

      {/* 标题卡 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: "7%",
          maxWidth: "64%",
          backgroundColor: "rgba(5, 7, 10, 0.8)",
          backdropFilter: "blur(20px)",
          borderRadius: 20,
          borderLeft: \`5px solid \${C.blue}\`,
          padding: 48,
          opacity,
          transform: \`translateY(\${yOffset}px)\`,
          boxShadow: "0 18px 60px rgba(0, 0, 0, 0.45)",
        }}
      >
        <div style={{ fontSize: 60, fontWeight: 700, color: C.white, lineHeight: 1.2, ...TITLE_EFFECT }}>
          {/* TODO: 替换标题 */}
          ${topic}
        </div>
      </div>
    </AbsoluteFill>
  );
};
`;

// ── 生成 script.txt ───────────────────────────────
const scriptTxt = `# ${ep} · ${topic}

口播文稿草稿（TODO: 替换为正式内容）

第1段：Hook — 引出话题，制造认知冲突
第2段：背景 — 概念解释，降低理解门槛
第3段：核心观点 — 本集要传递的关键信息
第4段：举例 — 用具体数字/场景佐证
第5段：总结 — 回扣开头，给出行动建议
最后一行：下一期预告
`;

// ── 更新 Root.tsx ─────────────────────────────────
async function updateRoot() {
  const rootPath = join(ROOT, 'src', 'Root.tsx');
  let content = await readFile(rootPath, 'utf-8');

  const importVideo = `import { ${ep}Video } from "./episodes/${ep}/Composition";`;
  const importConfig = `import { ${epLower}Config } from "./episodes/${ep}/config";`;

  if (content.includes(importVideo)) return; // 已存在

  // 在最后一个 import 之后添加
  const lastImport = content.lastIndexOf('import ');
  const lineEnd = content.indexOf('\n', lastImport);
  content = content.slice(0, lineEnd + 1) + importVideo + '\n' + importConfig + '\n' + content.slice(lineEnd + 1);

  // 在 </> 前添加 Composition
  content = content.replace(
    /(\s*<\/>\s*);\s*$/,
    (match) => {
      const composition = \`      <Composition
        id={${epLower}Config.compositionId}
        component={${ep}Video}
        durationInFrames={${epLower}Config.durationInFrames}
        fps={${epLower}Config.fps}
        width={${epLower}Config.width}
        height={${epLower}Config.height}
      />
\`;
      return '\n' + composition + match;
    }
  );

  await writeFile(rootPath, content);
}

// ── 更新 episodes/index.ts ────────────────────────
async function updateRegistry() {
  const regPath = join(ROOT, 'src', 'episodes', 'index.ts');
  let content = await readFile(regPath, 'utf-8');

  const importLine = `import { ${epLower}Config } from "./${ep}/config";`;
  if (content.includes(importLine)) return;

  // 在最后一个 import 之后添加
  const lastImport = content.lastIndexOf('import ');
  const lineEnd = content.indexOf('\n', lastImport);
  content = content.slice(0, lineEnd + 1) + importLine + '\n' + content.slice(lineEnd + 1);

  // 在 ] 之前添加数组项
  content = content.replace(
    /(\s*)\];\s*$/,
    (match, spaces) => `  ${epLower}Config,\n];`
  );

  await writeFile(regPath, content);
}

// ── 更新 package.json ─────────────────────────────
async function updatePackage() {
  const pkgPath = join(ROOT, 'package.json');
  let content = await readFile(pkgPath, 'utf-8');
  const pkg = JSON.parse(content);

  const scriptKey = `build:${epLower}`;
  if (!pkg.scripts[scriptKey]) {
    pkg.scripts[scriptKey] = `remotion render PropFirmTV-${ep} output/PropFirmTV_${ep}.mp4`;
  }

  await writeFile(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
}

// ── 主流程 ────────────────────────────────────────
async function main() {
  console.log(`\n🎬 创建 Episode: ${ep} — "${topic}"\n`);

  // 1. 创建源码目录和文件
  await mkdir(join(epDir, 'shots'), { recursive: true });
  await writeFile(join(epDir, 'config.ts'), configTs);
  await writeFile(join(epDir, 'Composition.tsx'), compositionTx);
  await writeFile(join(epDir, 'shots', 'Shot01.tsx'), shot01Tx);
  await writeFile(join(epDir, 'script.txt'), scriptTxt);
  console.log(`  ✅ src/episodes/${ep}/ — 配置、合成、示例 Shot、文稿`);

  // 2. 创建素材目录
  await mkdir(join(publicDir, 'eagle'), { recursive: true });
  await writeFile(join(publicDir, 'eagle', '.gitkeep'), '');
  await writeFile(join(publicDir, '.gitkeep'), '');
  console.log(`  ✅ public/${epLower}/ — 素材目录（放入 eagle/、avatar.webm、音频）`);

  // 3. 自动更新注册文件
  await updateRoot();
  console.log(`  ✅ src/Root.tsx — 已添加 Composition 注册`);

  await updateRegistry();
  console.log(`  ✅ src/episodes/index.ts — 已添加 import 和数组项`);

  await updatePackage();
  console.log(`  ✅ package.json — 已添加 build:${epLower} 脚本`);

  console.log(`\n📋 下一步：`);
  console.log(`  1. 编辑 src/episodes/${ep}/script.txt — 撰写口播文稿`);
  console.log(`  2. 生成音频 → public/${epLower}/avatar.webm`);
  console.log(`  3. 收集背景素材 → public/${epLower}/eagle/`);
  console.log(`  4. 编辑 src/episodes/${ep}/config.ts — 填写 shots + subtitles`);
  console.log(`  5. npm run studio — 预览`);
  console.log(`  6. npm run build:${epLower} — 渲染成片\n`);
}

main().catch(console.error);
