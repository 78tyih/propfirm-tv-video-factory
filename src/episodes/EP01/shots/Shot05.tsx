import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, OffthreadVideo, staticFile, spring, interpolate, Easing, Img } from "remotion";
import { C, FONT, TITLE_EFFECT, fadeIn, fadeOut, slideUp, hexA } from "../../../shared/theme";

/* ════════════════════════════════════════════════════════════════
 * Shot05 · 本质揭示「借钱交易？ → 交易考试」
 * 修订 v2：
 * - 去除全局暗色蒙版：背景视频保持原始亮度
 * - 标题改为自带深色底板的卡片 rgba(5,7,10,0.75) + blur(16px)
 * - "💰 借钱交易？" fontSize 88 灰色；淡出时 scale 缩小到 0.65
 * - "🎯 交易考试" fontSize 100 品牌蓝；spring 回弹入场 + textShadow glow
 * - 考察维度升级为横排大卡片：emoji + fontSize 30 + 顶部蓝色 accent line
 * ══════════════════════════════════════════════════════════════ */

/** 局部文字底板：替代全局蒙版 */
const LOCAL_PANEL = "rgba(5, 7, 10, 0.75)" as const;

const metrics = [
  { emoji: "🧠", label: "Discipline", zh: "纪律", delay: 60 },
  { emoji: "🛡️", label: "Risk Control", zh: "风险控制", delay: 100 },
  { emoji: "📏", label: "Rule Compliance", zh: "规则执行", delay: 140 },
];

export const Shot05: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phase1Opacity = fadeIn(frame, 0, 26) * fadeOut(frame, 80, 44);
  // 淡出同步：scale 缩小到 0.65
  const phase1Scale = interpolate(frame, [80, 124], [1, 0.65], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });

  const phase2Opacity = fadeIn(frame, 120, 26);
  // spring scale 入场（轻回弹）
  const phase2Scale = spring({
    frame: frame - 120,
    fps,
    config: { damping: 11, stiffness: 130, mass: 0.9 },
  });

  return (
    <AbsoluteFill style={{ overflow: "hidden", fontFamily: FONT }}>
      {/* Eagle Video Background: TradingView chart（无全局蒙版，保持原始亮度） */}
      <OffthreadVideo
        src={staticFile("ep01/eagle/tv_chart.mp4")}
        style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover" }}
        muted
      />

      {/* "💰 借钱交易?" · 深色底板卡片，淡出时缩到 0.65 */}
      <div
        style={{
          position: "absolute",
          top: "27%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: phase1Opacity,
        }}
      >
        <div
          style={{
            transform: `scale(${phase1Scale})`,
            backgroundColor: LOCAL_PANEL,
            backdropFilter: "blur(16px)",
            border: `1.5px solid ${C.hairline}`,
            borderRadius: 20,
            padding: "30px 56px",
            boxShadow: "0 10px 34px rgba(0, 0, 0, 0.35)",
          }}
        >
          <div style={{ fontSize: 88, fontWeight: 700, color: C.muted, whiteSpace: "nowrap", ...TITLE_EFFECT }}>
            💰 借钱交易？
          </div>
        </div>
      </div>

      {/* "🎯 交易考试" · 深色底板卡片，spring 回弹入场 + 蓝色 glow */}
      <div
        style={{
          position: "absolute",
          top: "27%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: phase2Opacity,
        }}
      >
        <div
          style={{
            transform: `scale(${phase2Scale})`,
            backgroundColor: "rgba(5, 7, 10, 0.78)",
            backdropFilter: "blur(16px)",
            border: `2px solid ${hexA(C.blue, 0.55)}`,
            borderRadius: 22,
            padding: "34px 64px",
            boxShadow: `0 12px 40px rgba(0, 0, 0, 0.4), 0 0 60px ${hexA(C.blue, 0.28)}`,
          }}
        >
          <div
            style={{
              fontSize: 100,
              fontWeight: 800,
              color: C.blue,
              letterSpacing: "0.04em",
              whiteSpace: "nowrap",
              textShadow: `0 3px 18px rgba(0, 0, 0, 0.55), 0 0 46px ${hexA(C.blue, 0.45)}`,
            }}
          >
            🎯 交易考试
          </div>
        </div>
      </div>

      {/* Metrics · 横排大卡片：emoji + 顶部蓝色 accent line，依次入场 */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 36,
        }}
      >
        {metrics.map((m) => {
          const mOpacity = fadeIn(frame, m.delay, 18);
          const mY = slideUp(frame, m.delay, 22, 14);
          return (
            <div
              key={m.label}
              style={{
                position: "relative",
                overflow: "hidden",
                opacity: mOpacity,
                transform: `translateY(${mY}px)`,
                backgroundColor: LOCAL_PANEL,
                border: `1.5px solid ${C.blueLine}`,
                borderRadius: 14,
                padding: "24px 40px 26px",
                backdropFilter: "blur(16px)",
                boxShadow: "0 8px 26px rgba(0, 0, 0, 0.35)",
                textAlign: "center",
              }}
            >
              {/* 顶部蓝色 accent line */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  backgroundColor: C.blue,
                  boxShadow: `0 0 14px ${hexA(C.blue, 0.5)}`,
                }}
              />
              <div style={{ fontSize: 30, fontWeight: 600, color: C.white, letterSpacing: "0.03em", whiteSpace: "nowrap" }}>
                <span style={{ marginRight: 10 }}>{m.emoji}</span>
                {m.label}
              </div>
              <div style={{ fontSize: 19, fontWeight: 500, color: C.muted, letterSpacing: "0.08em", marginTop: 8 }}>
                {m.zh}
              </div>
            </div>
          );
        })}
      </div>

      {/* 左侧浮卡 · 考试盘官网「盈利日历」截图（Eagle 素材，轻倾斜） */}
      <div
        style={{
          position: "absolute",
          left: "4%",
          top: "42%",
          opacity: fadeIn(frame, 150, 22),
          transform: `translateY(${slideUp(frame, 150, 24, 14)}px) rotate(-4deg)`,
          backgroundColor: LOCAL_PANEL,
          backdropFilter: "blur(16px)",
          border: `1.5px solid ${C.hairline}`,
          borderRadius: 16,
          padding: 14,
          boxShadow: "0 14px 44px rgba(0, 0, 0, 0.45)",
          textAlign: "center",
        }}
      >
        <div style={{ borderRadius: 10, overflow: "hidden", border: `1px solid ${C.hairline}` }}>
          <Img
            src={staticFile("ep01/eagle/lucid_pnl_calendar.jpg")}
            style={{ width: 360, height: 210, objectFit: "cover", objectPosition: "top" }}
          />
        </div>
        <div style={{ fontSize: 19, fontWeight: 600, color: C.muted, letterSpacing: "0.05em", marginTop: 10 }}>
          📅 盈利日历
        </div>
      </div>

      {/* 右侧浮卡 · 考试盘「账户后台」视频窗（Eagle 素材，轻倾斜） */}
      <div
        style={{
          position: "absolute",
          right: "4%",
          top: "38%",
          opacity: fadeIn(frame, 165, 22),
          transform: `translateY(${slideUp(frame, 165, 24, 14)}px) rotate(4deg)`,
          backgroundColor: LOCAL_PANEL,
          backdropFilter: "blur(16px)",
          border: `1.5px solid ${C.hairline}`,
          borderRadius: 16,
          padding: 14,
          boxShadow: "0 14px 44px rgba(0, 0, 0, 0.45)",
          textAlign: "center",
        }}
      >
        <div style={{ borderRadius: 10, overflow: "hidden", border: `1px solid ${C.hairline}` }}>
          <OffthreadVideo
            src={staticFile("ep01/eagle/fff_account.mp4")}
            style={{ width: 360, height: 210, objectFit: "cover" }}
            muted
          />
        </div>
        <div style={{ fontSize: 19, fontWeight: 600, color: C.muted, letterSpacing: "0.05em", marginTop: 10 }}>
          💼 考试账户后台
        </div>
      </div>
    </AbsoluteFill>
  );
};
