import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, OffthreadVideo, staticFile, spring } from "remotion";
import { C, FONT, TITLE_EFFECT, fadeIn, scaleIn } from "../../../shared/theme";

/* ════════════════════════════════════════════════════════════════
 * Shot08 · 收束「先看懂规则，再谈通过」
 * 修订：去除全局暗色蒙版与径向叠层，背景视频保持原始亮度；
 * 中央总结卡片自带深色底板 + blur(20px)，两行标题 spring 延迟入场。
 * ══════════════════════════════════════════════════════════════ */

export const Shot08: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const mainOpacity = fadeIn(frame, 0, 26);
  const mainScale = scaleIn(frame, 0, 28, 0.97);
  const englishOpacity = fadeIn(frame, 90, 34);

  // 两行 spring 入场：第二行延迟 16 帧
  const line1 = spring({ frame, fps, config: { damping: 15, mass: 0.7 } });
  const line2 = spring({ frame: frame - 16, fps, config: { damping: 15, mass: 0.7 } });

  return (
    <AbsoluteFill style={{ overflow: "hidden", fontFamily: FONT }}>
      {/* Eagle Video Background: Wall Street / Trading Floor（原始亮度，无全局蒙版） */}
      <OffthreadVideo
        src={staticFile("ep01/eagle/wallstreet.mp4")}
        style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover" }}
        muted
      />

      {/* Summary card · 自带深色底板，文字全部收进卡片 */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${mainScale})`,
          opacity: mainOpacity,
          textAlign: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(5, 7, 10, 0.8)",
            border: `1.5px solid ${C.blueLine}`,
            borderRadius: 24,
            padding: "56px 110px",
            backdropFilter: "blur(20px)",
            boxShadow:
              "0 24px 80px rgba(0, 0, 0, 0.65), 0 0 72px rgba(20, 110, 255, 0.18)",
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: C.white,
              lineHeight: 1.35,
              letterSpacing: "-0.01em",
              opacity: line1,
              transform: `translateY(${(1 - line1) * 26}px)`,
              ...TITLE_EFFECT,
            }}
          >
            📋 先看懂<span style={{ color: C.blue }}>规则</span>
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: C.white,
              lineHeight: 1.35,
              marginTop: 10,
              opacity: line2,
              transform: `translateY(${(1 - line2) * 26}px)`,
              ...TITLE_EFFECT,
            }}
          >
            ✅ 再谈<span style={{ color: C.blue }}>通过</span>
          </div>

          {/* 底部英文（卡片内，保证可读性） */}
          <div
            style={{
              marginTop: 34,
              fontSize: 22,
              color: C.muted,
              opacity: englishOpacity,
              fontStyle: "italic",
              letterSpacing: "0.04em",
            }}
          >
            Understand the game before playing it.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
