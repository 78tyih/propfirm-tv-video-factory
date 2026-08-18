import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Img, staticFile, spring } from "remotion";
import { C, FONT, TITLE_EFFECT, fadeIn, fadeOut } from "../../../shared/theme";

/* ════════════════════════════════════════════════════════════════
 * Shot09 · 下期预告「盈利了，为什么还是通不过？」
 * 修订：去除全局暗色蒙版与径向叠层，背景图保持原始亮度；
 * 品牌区与预告卡各自带深色底板，预告卡 spring scale 入场。
 * ══════════════════════════════════════════════════════════════ */

export const Shot09: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const brandOpacity = fadeIn(frame, 0, 26);
  // 预告卡 spring scale 入场（40 帧启动）
  const cardIn = spring({ frame: frame - 40, fps, config: { damping: 14, mass: 0.8 } });
  const cardOpacity = fadeIn(frame, 40, 22);
  // 最后 50 帧淡出
  const out = fadeOut(frame, 160, 50);

  return (
    <AbsoluteFill style={{ overflow: "hidden", opacity: out, fontFamily: FONT }}>
      {/* Eagle Cover Background（原始亮度，无全局蒙版） */}
      <Img
        src={staticFile("ep01/eagle/pftv_cover.png")}
        style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover" }}
      />

      {/* Brand · 自带深色底板，出现 PropFirm.TV 时展示官方 Logo */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: brandOpacity,
          textAlign: "center",
          backgroundColor: "rgba(5, 7, 10, 0.75)",
          backdropFilter: "blur(16px)",
          border: `1px solid ${C.hairline}`,
          borderRadius: 16,
          padding: "30px 56px 26px",
        }}
      >
        {/* 官方 Logo（brand/propfirm-tv_logo.svg） */}
        <Img
          src={staticFile("brand/propfirm-tv_logo.svg")}
          style={{ width: 300, height: "auto", marginBottom: 16 }}
        />
        {/* 蓝色分割线 */}
        <div style={{ width: 100, height: 4, backgroundColor: C.blue, margin: "0 auto 16px" }} />
        <div style={{ fontSize: 18, fontWeight: 500, color: C.muted, letterSpacing: "0.1em" }}>
          📺 NEXT EPISODE
        </div>
      </div>

      {/* Next episode teaser 卡片 · spring scale 入场 */}
      <div
        style={{
          position: "absolute",
          top: "54%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${0.85 + 0.15 * cardIn})`,
          opacity: cardOpacity,
          textAlign: "center",
          backgroundColor: "rgba(5, 7, 10, 0.78)",
          backdropFilter: "blur(16px)",
          border: `1.5px solid ${C.hairline}`,
          borderRadius: 28,
          padding: "48px 96px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.55)",
        }}
      >
        <div style={{ fontSize: 52, fontWeight: 800, color: C.white, lineHeight: 1.45, ...TITLE_EFFECT }}>
          💰 盈利了
        </div>
        <div style={{ fontSize: 52, fontWeight: 800, color: C.white, lineHeight: 1.45, ...TITLE_EFFECT }}>
          ❌ 为什么还是<span style={{ color: C.red }}>通不过</span>？
        </div>
      </div>

      {/* Bottom accent · 静态强调线 */}
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          left: "50%",
          transform: "translateX(-50%)",
          width: interpolate(frame, [20, 80], [0, 120], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          height: 2,
          backgroundColor: C.blue,
          opacity: 0.5,
        }}
      />
    </AbsoluteFill>
  );
};
