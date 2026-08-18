/* ════════════════════════════════════════════════════════════════
 * PropFirm.TV Episode Config Schema
 *
 * 定义一集视频从音频到画面到字幕的完整数据契约。
 * 新增 episode 只需编写一个符合此接口的 config.ts。
 * ════════════════════════════════════════════════════════════════ */

// ── 字幕 ──────────────────────────────────────────
export interface SubtitleLine {
  start: number;          // 起始帧
  end: number;            // 结束帧
  zh: string;             // 中文主字幕
  en: string;             // 英文短译
  highlights?: string[];  // 高亮关键词（蓝色强调 / 橙色风险）
}

// ── 数字人 ────────────────────────────────────────
export interface AvatarConfig {
  src: string;                       // staticFile 路径，如 "ep01/avatar_v2.webm"
  circleSize?: number;               // 直径 px（默认 350）
  visible?: boolean;                  // 是否显示（默认 true）
  fadeOutStart?: number;             // 淡出起始帧（默认不淡出）
  fadeOutEnd?: number;               // 淡出结束帧
}

// ── 镜头 ──────────────────────────────────────────
export interface ShotConfig {
  id: string;                        // 'shot01', 'shot02', ...
  from: number;                      // 在 episode 时间线上的起始帧
  durationInFrames: number;          // 持续帧数
  component: string;                 // Shot 组件文件名（如 'Shot01'），从 episodes/EPXX/shots/ 导入
}

// ── Episode 完整配置 ──────────────────────────────
export interface EpisodeConfig {
  // 元数据
  id: string;                        // 'EP01'
  title: string;                     // 集标题
  description?: string;              // 简介
  compositionId: string;             // Remotion composition id，如 'PropFirmTV-EP01'

  // 视频规格
  durationInFrames: number;          // 总帧数
  fps: number;                       // 帧率（默认 30）
  width: number;                     // 分辨率宽（默认 1920）
  height: number;                    // 分辨率高（默认 1080）

  // 音频
  audioSrc: string;                  // staticFile 路径，如 "ep01/avatar_v2.webm"

  // 数字人
  avatar: AvatarConfig;

  // 镜头列表（每个镜头引用 episodes/EPXX/shots/ 下的组件）
  shots: ShotConfig[];

  // 字幕
  subtitles: SubtitleLine[];

  // 背景底图（无镜头覆盖时的底板）
  backgroundSrc?: string;            // staticFile 路径，如 "ep01/studio_dark_bg.jpg"
}
