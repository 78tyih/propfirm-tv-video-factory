import React from "react";
import { interpolate, OffthreadVideo, staticFile } from "remotion";
import { fadeIn, scaleIn } from "../theme";
import type { AvatarConfig } from "../types";

/* ════════════════════════════════════════════════════════════════
 * 数字人圆形头像 · 参数化版
 *
 * 从 EpisodeConfig.avatar 注入素材路径和可见性控制。
 * 保持不变：右下角位置 / 默认 350px / 中性细边 + 柔和投影
 * ══════════════════════════════════════════════════════════════ */

export const AvatarCircle: React.FC<{ config: AvatarConfig }> = ({ config }) => {
  const enter = fadeIn(8, 8, 22);
  const scale = scaleIn(8, 8, 26, 0.94);

  // 数字人帧数不可用——此处用全局帧
  // 注意：AvatarCircle 在 Composition 中以 useCurrentFrame() 的 frame prop 传入
  // 但为了支持 config 驱动，改为内部使用 useCurrentFrame
  // 这里接受外部 frame

  const visible = config.visible !== false;
  const fadeOutStart = config.fadeOutStart;
  const fadeOutEnd = config.fadeOutEnd;

  // 如果有淡出配置，需要 frame 参数
  // 我们通过 props 传入 frame
  return null; // 由下面的 AvatarCircleFrame 实现
};

// 实际渲染组件：接受 frame + config
export const AvatarCircleFrame: React.FC<{ frame: number; config: AvatarConfig }> = ({ frame, config }) => {
  const enter = fadeIn(frame, 8, 22);
  const scale = scaleIn(frame, 8, 26, 0.94);

  let opacity = config.visible !== false ? enter : 0;
  if (config.fadeOutStart !== undefined && config.fadeOutEnd !== undefined) {
    const fadeOut = interpolate(
      frame,
      [config.fadeOutStart, config.fadeOutEnd],
      [1, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
    opacity = opacity * fadeOut;
  }

  const circleSize = config.circleSize ?? 350;
  const src = config.src;

  // 轻微呼吸感
  const dx = 0.6 * Math.sin(frame / 14 + 0.5) + 0.4 * Math.sin(frame / 31 + 1.2);
  const dy = 0.5 * Math.sin(frame / 18 + 0.9) + 0.3 * Math.sin(frame / 37 + 2.8);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 60,
        right: 60,
        width: circleSize,
        height: circleSize,
        borderRadius: "50%",
        overflow: "hidden",
        opacity,
        transform: `translate(${dx}px, ${dy}px) scale(${scale})`,
        border: "1.5px solid rgba(247, 249, 252, 0.22)",
        boxShadow: "0 10px 34px rgba(0, 0, 0, 0.45), inset 0 0 0 1px rgba(5, 7, 10, 0.35)",
        zIndex: 100,
      }}
    >
      <OffthreadVideo
        src={staticFile(src)}
        style={{
          position: "absolute",
          height: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          objectFit: "cover",
        }}
        muted
      />
    </div>
  );
};
