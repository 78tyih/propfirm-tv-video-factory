import type { EpisodeConfig } from "../../shared/types";

/* ════════════════════════════════════════════════════════════════
 * EP01 · "你以为 Prop Firm 卖的是资金？其实它卖的是规则"
 *
 * 所有 episode-specific 数据集中于此：镜头 timing、字幕、数字人、音频。
 * Shot 组件代码在 episodes/EP01/shots/Shot01-09.tsx。
 * ════════════════════════════════════════════════════════════════ */

export const ep01Config: EpisodeConfig = {
  id: "EP01",
  title: "Prop Firm 卖的不是资金，是规则",
  description: "很多人第一次接触 Prop Firm 都以为逻辑很简单：平台给钱、你交易、赚了分成。但本质上你参加的是一场精心设计的交易考试。",
  compositionId: "PropFirmTV-EP01",

  durationInFrames: 1650,
  fps: 30,
  width: 1920,
  height: 1080,

  audioSrc: "ep01/avatar_v2.webm",

  avatar: {
    src: "ep01/avatar_v2.webm",
    circleSize: 350,
    visible: true,
  },

  backgroundSrc: "ep01/studio_dark_bg.jpg",

  shots: [
    { id: "shot01", from: 0,    durationInFrames: 118,  component: "Shot01" },
    { id: "shot02", from: 118,  durationInFrames: 157,  component: "Shot02" },
    { id: "shot03", from: 275,  durationInFrames: 225,  component: "Shot03" },
    { id: "shot04", from: 500,  durationInFrames: 308,  component: "Shot04" },
    { id: "shot05", from: 808,  durationInFrames: 235,  component: "Shot05" },
    { id: "shot06", from: 1043, durationInFrames: 149,  component: "Shot06" },
    { id: "shot07", from: 1192, durationInFrames: 143,  component: "Shot07" },
    { id: "shot08", from: 1335, durationInFrames: 238,  component: "Shot08" },
    { id: "shot09", from: 1573, durationInFrames: 77,   component: "Shot09" },
  ],

  // 字幕时间轴：whisper 对 avatar_v2.webm 实际配音的逐词转写（帧 @30fps）
  subtitles: [
    { start: 0,    end: 118, zh: "很多人第一次接触 Prop Firm 都会以为它的逻辑很简单", en: "Many think a prop firm is simple", highlights: ["Prop Firm"] },
    { start: 118,  end: 249, zh: "平台给你一笔钱 你拿去交易 赚了以后大家分成", en: "They fund you to trade and split the profits" },
    { start: 275,  end: 436, zh: "但 Prop Firm 真正卖给你的 其实不是钱", en: "But what it really sells isn't money", highlights: ["Prop Firm"] },
    { start: 449,  end: 491, zh: "而是一整套规则", en: "It's a complete rulebook", highlights: ["规则"] },
    { start: 500,  end: 591, zh: "它会规定你的盈利目标 最大回撤", en: "Profit target and max drawdown", highlights: ["盈利目标", "最大回撤"] },
    { start: 597,  end: 668, zh: "单日亏损 最少交易天数", en: "Daily loss and minimum trading days", highlights: ["单日亏损"] },
    { start: 668,  end: 810, zh: "甚至还有一致性 持仓和新闻交易限制", en: "Even consistency and news rules", highlights: ["一致性"] },
    { start: 810,  end: 891, zh: "表面上看 你是在借钱交易", en: "On the surface you're trading borrowed capital" },
    { start: 891,  end: 1032, zh: "本质上 你参加的是一场精心设计的交易考试", en: "In essence it's a finely designed trading exam", highlights: ["交易考试"] },
    { start: 1044, end: 1176, zh: "很多人不是不会交易 而是没看懂这场考试在考什么", en: "Many can trade but never read the exam" },
    { start: 1194, end: 1242, zh: "你以为自己输给了行情", en: "You think the market beat you" },
    { start: 1245, end: 1337, zh: "但很多时候 你是先输给了规则", en: "More often the rules beat you first", highlights: ["规则"] },
    { start: 1338, end: 1449, zh: "想做好 Prop Firm 第一步不是急着下单", en: "To pass step one isn't placing orders", highlights: ["Prop Firm"] },
    { start: 1461, end: 1577, zh: "而是先搞清楚 这家公司在考你什么", en: "It's knowing what the firm is testing" },
  ],
};
