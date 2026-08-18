import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  OffthreadVideo,
  staticFile,
} from "remotion";
import { C, FONT, TITLE_EFFECT, fadeIn } from "../../../shared/theme";

/* ════════════════════════════════════════════════════════════════
 * Shot01 · 开场钩子「你以为 Prop Firm = 给你钱交易？」
 * 修订：去除全局暗色蒙版，背景视频保持原始亮度；
 * 标题改为左侧大卡片（局部深色底板 + 毛玻璃），
 * border-left 蓝色强调，字体放大，加入 💰 emoji，
 * spring 入场动效。
 * ══════════════════════════════════════════════════════════════ */

export const Shot01: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring 入场动效：轻微回弹
  const enter = spring({
    frame: frame - 10,
    fps,
    config: { damping: 18, stiffness: 110, mass: 0.9 },
  });
  const titleY = (1 - enter) * 36;

  // 卡片内蓝色 accent line：随标题入场后展开
  const lineOpacity = fadeIn(frame, 28, 14);
  const lineWidth = interpolate(frame, [30, 62], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ overflow: "hidden", fontFamily: FONT }}>
      {/* Eagle Video Background: Trader multi-screen（原始亮度，无全局蒙版） */}
      <OffthreadVideo
        src={staticFile("ep01/eagle/trader_multiscreen.mp4")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        muted
      />

      {/* 左侧标题大卡片：局部深色底板保证文字可读性 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: "7%",
          maxWidth: "64%",
          backgroundColor: "rgba(5, 7, 10, 0.8)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: 20,
          borderLeft: `5px solid ${C.blue}`,
          padding: 48,
          opacity: enter,
          transform: `translateY(${titleY}px)`,
          boxShadow: "0 18px 60px rgba(0, 0, 0, 0.45)",
        }}
      >
        <div
          style={{
            fontSize: 60,
            fontWeight: 700,
            color: C.white,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            ...TITLE_EFFECT,
          }}
        >
          💰 你以为
          <span style={{ color: C.blue }}> Prop Firm </span>=
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: C.red,
            lineHeight: 1.2,
            marginTop: 16,
            letterSpacing: "-0.01em",
            ...TITLE_EFFECT,
          }}
        >
          给你钱交易？
        </div>

        {/* 蓝色 accent line */}
        <div
          style={{
            marginTop: 28,
            width: lineWidth,
            height: 4,
            backgroundColor: C.blue,
            borderRadius: 2,
            opacity: lineOpacity,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
