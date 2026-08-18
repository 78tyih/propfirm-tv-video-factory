import React from "react";
import { AbsoluteFill, useCurrentFrame, OffthreadVideo, staticFile } from "remotion";
import { C, FONT, TITLE_EFFECT, fadeIn, slideUp } from "../../../shared/theme";

/* ════════════════════════════════════════════════════════════════
 * Shot07 · 分屏对比「MARKET vs RULES」
 * 修订：去除全局暗色蒙版，背景视频保持原始亮度；
 * 文字可读性由卡片自带的局部深色底板 + backdrop blur 保证。
 * 左：📉 MARKET（frame 100 后 opacity 降到 0.3）
 * 右：📋 RULES + violation 面板（frame 100 后 scale 1.15 + 蓝色 glow）
 * ══════════════════════════════════════════════════════════════ */

export const Shot07: React.FC = () => {
  const frame = useCurrentFrame();

  const leftOpacity = fadeIn(frame, 0, 20);
  // frame 100 后左半屏压暗到 0.3（让位给 RULES）
  const leftDim = 1 - fadeIn(frame, 100, 50) * 0.7;
  const rightOpacity = fadeIn(frame, 30, 26);
  const rightActive = fadeIn(frame, 100, 60);
  const finalOpacity = fadeIn(frame, 180, 36);
  const finalY = slideUp(frame, 180, 36, 16);

  // frame 100 后右半屏放大到 1.15
  const rightScale = 1 + 0.15 * rightActive;

  return (
    <AbsoluteFill style={{ overflow: "hidden", fontFamily: FONT }}>
      {/* Eagle Video Background: TradingView chart（原始亮度，无全局蒙版） */}
      <OffthreadVideo
        src={staticFile("ep01/eagle/tv_nq_chart.mp4")}
        style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover" }}
        muted
      />

      {/* 中央分屏细线（不随左右压暗） */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "14%",
          bottom: "14%",
          width: 1,
          background: "rgba(247, 249, 252, 0.14)",
        }}
      />

      {/* Split screen（两个半屏均无全屏暗色背景） */}
      <div style={{ position: "absolute", inset: 0, display: "flex" }}>
        {/* LEFT: MARKET 卡片 · frame 100 后 opacity 降到 0.3 */}
        <div
          style={{
            flex: 1,
            opacity: leftOpacity * leftDim,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(5, 7, 10, 0.75)",
              backdropFilter: "blur(16px)",
              border: `1.5px solid ${C.redLine}`,
              borderRadius: 20,
              padding: "44px 72px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 56, fontWeight: 800, color: C.red, letterSpacing: "0.06em", ...TITLE_EFFECT }}>
              📉 MARKET
            </div>
            <div style={{ fontSize: 32, fontWeight: 500, color: C.muted, marginTop: 14 }}>
              输给行情
            </div>
          </div>
        </div>

        {/* RIGHT: RULES · frame 100 后 scale 1.15 + 蓝色 glow */}
        <div
          style={{
            flex: 1,
            opacity: rightOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${rightScale})`,
          }}
        >
          {/* Rule violation panel · 自带深色底板 */}
          <div
            style={{
              width: "64%",
              backgroundColor: "rgba(5, 7, 10, 0.75)",
              border: `1.5px solid rgba(255, 59, 69, ${0.3 + 0.3 * rightActive})`,
              borderRadius: 16,
              padding: 28,
              marginBottom: 36,
              backdropFilter: "blur(16px)",
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 700, color: C.muted, marginBottom: 22, letterSpacing: "0.08em" }}>
              ⚠️ RULE VIOLATION
            </div>
            {/* 3 条红色递减进度条（加宽到 height 14） */}
            <div style={{ width: "100%", height: 14, backgroundColor: "rgba(255, 59, 69, 0.55)", borderRadius: 7, marginBottom: 16 }} />
            <div style={{ width: "80%", height: 14, backgroundColor: "rgba(255, 59, 69, 0.35)", borderRadius: 7, marginBottom: 16 }} />
            <div style={{ width: "60%", height: 14, backgroundColor: "rgba(255, 59, 69, 0.2)", borderRadius: 7, marginBottom: 26 }} />
            <div style={{ fontSize: 28, fontWeight: 700, color: C.red }}>
              Drawdown Limit
            </div>
          </div>

          {/* RULES 标题卡片 · 蓝色 glow 随激活增强 */}
          <div
            style={{
              backgroundColor: "rgba(5, 7, 10, 0.75)",
              backdropFilter: "blur(16px)",
              border: `1.5px solid rgba(20, 110, 255, ${0.3 + 0.4 * rightActive})`,
              borderRadius: 20,
              padding: "36px 64px",
              textAlign: "center",
              boxShadow: `0 0 ${64 * rightActive}px rgba(20, 110, 255, ${0.35 * rightActive})`,
            }}
          >
            <div style={{ fontSize: 56, fontWeight: 800, color: C.blue, letterSpacing: "0.06em", ...TITLE_EFFECT }}>
              📋 RULES
            </div>
            <div style={{ fontSize: 32, fontWeight: 500, color: C.muted, marginTop: 14 }}>
              输给规则
            </div>
          </div>
        </div>
      </div>

      {/* 底部判定卡片 · 自带深色底板 */}
      <div
        style={{
          position: "absolute",
          bottom: "8%",
          left: "50%",
          transform: `translateX(-50%) translateY(${finalY}px)`,
          opacity: finalOpacity,
          textAlign: "center",
          backgroundColor: "rgba(5, 7, 10, 0.75)",
          backdropFilter: "blur(16px)",
          border: `1.5px solid ${C.blueLine}`,
          borderRadius: 20,
          padding: "32px 64px",
          boxShadow: "0 16px 48px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div style={{ fontSize: 40, fontWeight: 500, color: C.muted, marginBottom: 10 }}>
          你可能不是输给行情
        </div>
        <div style={{ fontSize: 56, fontWeight: 800, color: C.blue, ...TITLE_EFFECT }}>
          📋 你是输给规则
        </div>
      </div>
    </AbsoluteFill>
  );
};
