import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, OffthreadVideo, staticFile, spring } from "remotion";
import { C, FONT, TITLE_EFFECT, fadeIn, fadeOut, hexA } from "../../../shared/theme";

/* ════════════════════════════════════════════════════════════════
 * Shot06 · 追问「不会交易？→ 还是没看懂规则？」
 * 修订 v2：
 * - 去除全局暗色蒙版：背景视频保持原始亮度
 * - 标题改为自带深色底板的卡片 rgba(5,7,10,0.75) + blur(16px)
 * - "❓ 不会交易？" fontSize 88 灰色
 * - "📖 还是没看懂 规则？" fontSize 80，"规则" 蓝色高亮
 *   spring 回弹入场 + 仅卡片区域的蓝色 radial glow
 * ══════════════════════════════════════════════════════════════ */

/** 局部文字底板：替代全局蒙版 */
const LOCAL_PANEL = "rgba(5, 7, 10, 0.75)" as const;

export const Shot06: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phase1Opacity = fadeIn(frame, 0, 26) * fadeOut(frame, 80, 44);
  const phase2Opacity = fadeIn(frame, 120, 26);
  // spring 回弹入场
  const phase2Scale = spring({
    frame: frame - 120,
    fps,
    config: { damping: 12, stiffness: 120, mass: 0.9 },
  });

  return (
    <AbsoluteFill style={{ overflow: "hidden", fontFamily: FONT }}>
      {/* Eagle Video Background: Terminal K-line closeup（无全局蒙版，保持原始亮度） */}
      <OffthreadVideo
        src={staticFile("ep01/eagle/terminal_kline.mp4")}
        style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover" }}
        muted
      />

      {/* "❓ 不会交易？" · 深色底板卡片，灰色 */}
      <div
        style={{
          position: "absolute",
          top: "34%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: phase1Opacity,
        }}
      >
        <div
          style={{
            backgroundColor: LOCAL_PANEL,
            backdropFilter: "blur(16px)",
            border: `1.5px solid ${C.hairline}`,
            borderRadius: 20,
            padding: "30px 56px",
            boxShadow: "0 10px 34px rgba(0, 0, 0, 0.35)",
          }}
        >
          <div style={{ fontSize: 88, fontWeight: 700, color: C.muted, whiteSpace: "nowrap", ...TITLE_EFFECT }}>
            ❓ 不会交易？
          </div>
        </div>
      </div>

      {/* "📖 还是没看懂 规则？" · 深色底板卡片 + 卡片区域蓝色 radial glow */}
      <div
        style={{
          position: "absolute",
          top: "34%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${phase2Scale})`,
          opacity: phase2Opacity,
        }}
      >
        {/* 蓝色 radial glow：只覆盖卡片区域，不铺满全屏 */}
        <div
          style={{
            position: "absolute",
            inset: -70,
            background: `radial-gradient(ellipse at center, ${hexA(C.blue, 0.4)} 0%, ${hexA(C.blue, 0.12)} 45%, transparent 72%)`,
            filter: "blur(6px)",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            backgroundColor: "rgba(5, 7, 10, 0.78)",
            backdropFilter: "blur(16px)",
            border: `2px solid ${hexA(C.blue, 0.55)}`,
            borderRadius: 22,
            padding: "32px 60px",
            boxShadow: `0 12px 40px rgba(0, 0, 0, 0.4), 0 0 54px ${hexA(C.blue, 0.3)}`,
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 800,
              color: C.white,
              textAlign: "center",
              whiteSpace: "nowrap",
              ...TITLE_EFFECT,
            }}
          >
            📖 还是没看懂
            <span style={{ color: C.blue, textShadow: `0 0 40px ${hexA(C.blue, 0.5)}` }}> 规则</span>？
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
