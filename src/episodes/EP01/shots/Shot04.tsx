import React from "react";
import { AbsoluteFill, useCurrentFrame, OffthreadVideo, staticFile, interpolate, Easing, Img } from "remotion";
import { C, FONT, CARD_TITLE_EFFECT, fadeIn, scaleIn, slideUp, highlightShift, hexA } from "../../../shared/theme";

/* ════════════════════════════════════════════════════════════════
 * Shot04 · 六张规则卡（核心信息镜）
 * 修订 v2：
 * - 去除全局暗色蒙版：背景视频保持原始亮度
 * - 文字可读性改由局部深色底板承担 rgba(5,7,10,0.75) + blur(16px)
 * - Header 标题卡：border-left 5px 品牌蓝，"规则" 蓝色高亮
 * - 规则卡 3列×2行 加宽布局 + emoji 前缀；激活 border/scale 1.04/glow
 * - 右侧新增小型饼图卡（conic-gradient 甜甜圈 + 进度条）：规则覆盖率 87%
 * ══════════════════════════════════════════════════════════════ */

/** 局部文字底板：替代全局蒙版 */
const LOCAL_PANEL = "rgba(5, 7, 10, 0.75)" as const;

const rules = [
  { emoji: "📊", label: "Profit Target", zh: "盈利目标", color: C.blue },
  { emoji: "📉", label: "Max Drawdown", zh: "最大回撤", color: C.red },
  { emoji: "⚠️", label: "Daily Loss", zh: "单日亏损", color: C.red },
  { emoji: "📅", label: "Min Trading Days", zh: "最少交易天数", color: C.blue },
  { emoji: "✅", label: "Consistency", zh: "一致性要求", color: C.blue },
  { emoji: "🔒", label: "News Restriction", zh: "新闻交易限制", color: C.muted },
];

/** 口播同步的激活窗口（本镜本地帧：global 15.8s 起，30fps） */
const ACTIVE_WINDOWS: [number, number][] = [
  [6, 114], // 盈利目标 / 最大回撤
  [114, 204], // 单日亏损 / 最少交易天数
  [204, 280], // 一致性 / 新闻限制（保持到镜头结束）
];

const RuleCard: React.FC<{
  emoji: string; label: string; zh: string; color: string; index: number; frame: number;
}> = ({ emoji, label, zh, color, index, frame }) => {
  // 依次入场：每张卡 delay 递增 25 frame
  const delay = 10 + index * 25;
  const enterOpacity = fadeIn(frame, delay, 16);
  const enterScale = scaleIn(frame, delay, 20, 0.94);
  const enterY = slideUp(frame, delay, 20, 14);

  // Highlight Shift：当前讲到的卡片点亮，其余压暗到 0.5
  const [w0, w1] = ACTIVE_WINDOWS[Math.floor(index / 2)];
  const active = highlightShift(frame, w0, w1, 10);

  const opacity = enterOpacity * (0.5 + 0.5 * active); // 非激活 opacity 0.5
  const scale = enterScale * (1 + 0.04 * active); // 激活 scale 1.04

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${enterY}px) scale(${scale})`,
        backgroundColor: LOCAL_PANEL,
        border: `2px solid ${hexA(color, 0.18 + 0.62 * active)}`, // 激活时 border 变为对应颜色
        borderRadius: 16,
        padding: "26px 18px",
        backdropFilter: "blur(16px)",
        boxShadow: `0 8px 26px rgba(0, 0, 0, 0.35), 0 0 34px ${hexA(color, 0.34 * active)}`, // 激活 glow
        display: "flex",
        flexDirection: "column", // 竖排居中：emoji 在上，文字居中
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 10,
      }}
    >
      {/* emoji 图标：激活时提亮 */}
      <span style={{ fontSize: 52, lineHeight: 1, opacity: 0.55 + 0.45 * active }}>
        {emoji}
      </span>
      <span
        style={{
          fontSize: 33,
          fontWeight: 700,
          color: active > 0.4 ? color : C.white,
          letterSpacing: "0.02em",
          whiteSpace: "nowrap",
          ...CARD_TITLE_EFFECT,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: 23,
          fontWeight: 500,
          color: C.muted,
          letterSpacing: "0.04em",
          whiteSpace: "nowrap",
        }}
      >
        {zh}
      </span>
    </div>
  );
};

export const Shot04: React.FC = () => {
  const frame = useCurrentFrame();

  // 饼图覆盖率动画：0% → 87%
  const coverage = interpolate(frame, [50, 120], [0, 87], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{ overflow: "hidden", fontFamily: FONT }}>
      {/* Eagle Video Background: FFF 考试盘官网规则页（无全局蒙版，保持原始亮度） */}
      <OffthreadVideo
        src={staticFile("ep01/eagle/fff_rules.mp4")}
        style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover" }}
        muted
      />

      {/* Header 标题卡 · 局部深色底板 + 品牌蓝 border-left */}
      <div
        style={{
          position: "absolute",
          top: "6%",
          left: "6%",
          opacity: fadeIn(frame, 0, 18),
          transform: `translateY(${slideUp(frame, 0, 20, 12)}px)`,
          backgroundColor: LOCAL_PANEL,
          backdropFilter: "blur(16px)",
          borderLeft: `5px solid ${C.blue}`,
          borderRadius: 12,
          padding: "18px 32px",
          boxShadow: "0 8px 26px rgba(0, 0, 0, 0.35)",
        }}
      >
        <span
          style={{
            fontSize: 40,
            fontWeight: 800,
            color: C.white,
            letterSpacing: "0.03em",
            ...CARD_TITLE_EFFECT,
          }}
        >
          📋 一整套<span style={{ color: C.blue }}>规则</span>
        </span>
      </div>

      {/* 规则卡 · 3列×2行 加宽网格 */}
      <div
        style={{
          position: "absolute",
          left: "6%",
          top: "26%",
          height: "46%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: 20,
          width: "62%",
        }}
      >
        {rules.map((rule, i) => (
          <RuleCard key={rule.label} {...rule} index={i} frame={frame} />
        ))}
      </div>

      {/* 右侧 · 规则覆盖率饼图卡 */}
      <div
        style={{
          position: "absolute",
          right: "5.5%",
          top: "26%",
          width: "25%",
          opacity: fadeIn(frame, 40, 20),
          transform: `translateY(${slideUp(frame, 40, 24, 14)}px)`,
          backgroundColor: LOCAL_PANEL,
          backdropFilter: "blur(16px)",
          border: `1.5px solid ${C.hairline}`,
          borderRadius: 18,
          padding: "30px 26px",
          boxShadow: "0 10px 32px rgba(0, 0, 0, 0.38)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        {/* conic-gradient 甜甜圈饼图 */}
        <div
          style={{
            width: 140,
            height: 140,
            borderRadius: "50%",
            background: `conic-gradient(${C.blue} 0% ${coverage}%, rgba(247, 249, 252, 0.12) ${coverage}% 100%)`,
            boxShadow: `0 0 34px ${hexA(C.blue, 0.28)}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: "50%",
              backgroundColor: "rgba(5, 7, 10, 0.94)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: 36, fontWeight: 800, color: C.white }}>
              {Math.round(coverage)}
              <span style={{ fontSize: 20, color: C.blue }}>%</span>
            </span>
          </div>
        </div>

        {/* 标签 */}
        <div style={{ fontSize: 22, fontWeight: 700, color: C.white, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
          📈 规则覆盖率 87%
        </div>

        {/* 进度条 */}
        <div
          style={{
            width: "100%",
            height: 8,
            borderRadius: 4,
            backgroundColor: "rgba(247, 249, 252, 0.12)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${coverage}%`,
              height: "100%",
              borderRadius: 4,
              backgroundColor: C.blue,
              boxShadow: `0 0 12px ${hexA(C.blue, 0.55)}`,
            }}
          />
        </div>

        {/* 考试盘官网截图：实盘盈利数据（Eagle 素材） */}
        <div
          style={{
            width: "100%",
            borderRadius: 12,
            overflow: "hidden",
            border: `1px solid ${C.hairline}`,
            boxShadow: "0 8px 22px rgba(0, 0, 0, 0.4)",
          }}
        >
          <Img
            src={staticFile("ep01/eagle/tradeify_dashboard.jpg")}
            style={{ width: "100%", height: 190, objectFit: "cover", objectPosition: "top" }}
          />
        </div>
        <div style={{ fontSize: 18, fontWeight: 600, color: C.muted, letterSpacing: "0.05em" }}>
          📊 官网盈利数据后台
        </div>
      </div>
    </AbsoluteFill>
  );
};
