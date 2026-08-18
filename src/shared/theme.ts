/* ════════════════════════════════════════════════════════════════
 * PropFirm.TV · Calm Fintech Editorial 设计令牌
 *
 * 全片统一的色彩 / 字体层级 / 动效语法。
 * 动效只保留四类：Fade / Slide Up / Scale In / Highlight Shift。
 * ════════════════════════════════════════════════════════════════ */

import { Easing, interpolate } from "remotion";

/** 品牌色板 */
export const C = {
  bg: "#05070A",
  panel: "rgba(10, 14, 22, 0.78)",      // 卡片深色半透明底
  panelBright: "rgba(18, 25, 40, 0.88)", // 激活态卡片底
  white: "#F7F9FC",
  muted: "#8B96A8",
  blue: "#146EFF",
  red: "#FF3B45",
  yellow: "#FFC53D",                     // 字幕强调·黄
  orange: "#FF8A3D",                      // 字幕强调·橙（风险类）
  hairline: "rgba(247, 249, 252, 0.10)",  // 静态细描边
  blueLine: "rgba(20, 110, 255, 0.45)",  // 蓝色卡片描边
  redLine: "rgba(255, 59, 69, 0.45)",    // 红色卡片描边
} as const;

/** 全片统一字体栈 */
export const FONT =
  "'Inter', -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Noto Sans CJK SC', sans-serif";

/** A 级主标题质感：细描边 + 轻阴影 */
export const TITLE_EFFECT = {
  WebkitTextStroke: "0.6px rgba(5, 7, 10, 0.45)",
  textShadow: "0 3px 18px rgba(0, 0, 0, 0.55), 0 1px 3px rgba(0, 0, 0, 0.6)",
} as const;

/** B 级卡片标题质感（比 A 级更轻） */
export const CARD_TITLE_EFFECT = {
  textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
} as const;

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const SOFT = Easing.out(Easing.cubic);

/** Fade：柔和淡入 */
export const fadeIn = (frame: number, start: number, dur = 18): number =>
  interpolate(frame, [start, start + dur], [0, 1], { ...clamp, easing: SOFT });

/** Fade out：柔和淡出 */
export const fadeOut = (frame: number, start: number, dur = 15): number =>
  interpolate(frame, [start, start + dur], [1, 0], { ...clamp, easing: SOFT });

/** Slide Up：从下方 dist 像素处柔和滑入（返回 translateY 像素值） */
export const slideUp = (frame: number, start: number, dur = 24, dist = 16): number =>
  interpolate(frame, [start, start + dur], [dist, 0], { ...clamp, easing: SOFT });

/** Scale In：从 from 柔和放大到 1，无回弹（返回 scale 值） */
export const scaleIn = (frame: number, start: number, dur = 22, from = 0.96): number =>
  interpolate(frame, [start, start + dur], [from, 1], { ...clamp, easing: SOFT });

/** Highlight Shift：元素在 [start, end] 窗口内被"点亮"的强度 0→1→0 */
export const highlightShift = (
  frame: number,
  start: number,
  end: number,
  ramp = 8,
): number =>
  interpolate(frame, [start - ramp, start, end, end + ramp], [0, 1, 1, 0], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });

/** hex 颜色 + 透明度 → rgba 字符串 */
export const hexA = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
