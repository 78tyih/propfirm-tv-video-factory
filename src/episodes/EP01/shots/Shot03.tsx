import React from "react";
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
  OffthreadVideo,
  staticFile,
} from "remotion";
import { C, FONT, TITLE_EFFECT, fadeIn, fadeOut, scaleIn } from "../../../shared/theme";

/* ════════════════════════════════════════════════════════════════
 * Shot03 · 核心转折「不是钱 → 是规则」
 * 修订：去除全局暗色蒙版与 dim 蒙版，背景视频保持原始亮度；
 * 两张文字卡片自带局部深色底板 + 毛玻璃；
 * 「❌ 不是钱」灰色 120，frame 110 触发红色删除线；
 * 「📋 是规则」蓝色 130，spring scale 入场 + 文字光晕，
 * 出现时仅在卡片区域叠加蓝色 radial glow（非全屏）。
 * ══════════════════════════════════════════════════════════════ */

export const Shot03: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phase1Opacity = fadeIn(frame, 0, 26) * fadeOut(frame, 100, 40);
  const phase1Scale = scaleIn(frame, 5, 26, 0.95);
  const phase2Opacity = fadeIn(frame, 130, 34);

  // 「是规则」spring scale 入场（带回弹）
  const phase2Spring = spring({
    frame: frame - 130,
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.9 },
  });

  // 卡片局部蓝色 radial glow，随「是规则」出现
  const glowOpacity = fadeIn(frame, 135, 30);

  return (
    <AbsoluteFill style={{ overflow: "hidden", fontFamily: FONT }}>
      {/* Eagle Video Background: Rules page（原始亮度，无全局蒙版） */}
      <OffthreadVideo
        src={staticFile("ep01/eagle/rules_page.mp4")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        muted
      />

      {/* 「不是钱」卡片 · 局部深色底板 */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: phase1Opacity,
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(5, 7, 10, 0.8)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: 20,
            padding: "40px 72px",
            fontSize: 120,
            fontWeight: 700,
            color: C.muted,
            whiteSpace: "nowrap",
            textDecoration: frame > 110 ? "line-through" : "none",
            textDecorationColor: C.red,
            textDecorationThickness: 6,
            transform: `scale(${phase1Scale})`,
            boxShadow: "0 18px 60px rgba(0, 0, 0, 0.45)",
            ...TITLE_EFFECT,
          }}
        >
          ❌ 不是钱
        </div>
      </div>

      {/* 「是规则」局部蓝色 radial glow：只覆盖卡片区域，不是全屏 */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          width: 1000,
          height: 560,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(closest-side, rgba(20, 110, 255, 0.32) 0%, rgba(20, 110, 255, 0.12) 45%, transparent 75%)",
          opacity: glowOpacity,
          pointerEvents: "none",
        }}
      />

      {/* 「是规则」卡片 · 局部深色底板 + spring scale 入场 */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: phase2Opacity,
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(5, 7, 10, 0.8)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: 20,
            padding: "40px 72px",
            fontSize: 130,
            fontWeight: 800,
            color: C.blue,
            whiteSpace: "nowrap",
            transform: `scale(${phase2Spring})`,
            boxShadow: "0 18px 60px rgba(0, 0, 0, 0.45)",
            ...TITLE_EFFECT,
            textShadow:
              "0 3px 18px rgba(0, 0, 0, 0.55), 0 0 44px rgba(20, 110, 255, 0.45)",
          }}
        >
          📋 是规则
        </div>
      </div>
    </AbsoluteFill>
  );
};
