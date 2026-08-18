import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  OffthreadVideo,
  staticFile,
} from "remotion";
import { C, FONT, CARD_TITLE_EFFECT, fadeIn, scaleIn, slideUp } from "../../../shared/theme";

/* ════════════════════════════════════════════════════════════════
 * Shot02 · 表层认知流程「平台资金 → 交易 → 盈利 → 分成」
 * 修订：去除全局暗色蒙版，背景视频保持原始亮度；
 * 左侧 dashboard 卡片加入柱状图与余额指标；
 * Flow 节点竖排卡片化 + emoji，节点间蓝色竖线连接；
 * 右侧新增圆形百分比指标卡片（80% Profit Split）。
 * ══════════════════════════════════════════════════════════════ */

const GREEN = "#22C55E";

/** 竖排流程节点卡片（局部深色底板 + 毛玻璃） */
const FlowNode: React.FC<{ label: string; delay: number; frame: number }> = ({
  label,
  delay,
  frame,
}) => {
  const opacity = fadeIn(frame, delay, 16);
  const scale = scaleIn(frame, delay, 20, 0.95);
  const y0 = slideUp(frame, delay, 20, 10);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y0}px) scale(${scale})`,
        backgroundColor: "rgba(5, 7, 10, 0.75)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: `1.5px solid ${C.blueLine}`,
        borderRadius: 14,
        padding: "22px 44px",
        fontSize: 28,
        fontWeight: 600,
        color: C.white,
        letterSpacing: "0.02em",
        whiteSpace: "nowrap",
        boxShadow: "0 6px 22px rgba(0, 0, 0, 0.35)",
        ...CARD_TITLE_EFFECT,
      }}
    >
      {label}
    </div>
  );
};

/** 节点间蓝色竖线连接器 */
const Connector: React.FC<{ delay: number; frame: number }> = ({ delay, frame }) => {
  const opacity = fadeIn(frame, delay, 14);
  return (
    <div
      style={{
        width: 3,
        height: 28,
        backgroundColor: C.blue,
        borderRadius: 2,
        opacity,
      }}
    />
  );
};

/** 小型柱状图（div 模拟，5 根递增，蓝色系，逐根生长） */
const MiniBarChart: React.FC<{ frame: number }> = ({ frame }) => {
  const heights = [46, 78, 112, 150, 190];
  const colors = [
    "rgba(20, 110, 255, 0.30)",
    "rgba(20, 110, 255, 0.45)",
    "rgba(20, 110, 255, 0.60)",
    "rgba(20, 110, 255, 0.78)",
    C.blue,
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 16,
        height: 210,
        marginTop: 28,
      }}
    >
      {heights.map((h, i) => {
        const grow = fadeIn(frame, 15 + i * 8, 20);
        return (
          <div
            key={i}
            style={{
              width: 44,
              height: h,
              backgroundColor: colors[i],
              borderRadius: "6px 6px 3px 3px",
              transform: `scaleY(${grow})`,
              transformOrigin: "bottom",
            }}
          />
        );
      })}
    </div>
  );
};

/** 右侧圆形百分比指标卡片：圆环进度条（conic 环 + 中心镂空） */
const ProfitSplitRing: React.FC<{ frame: number }> = ({ frame }) => {
  const cardOpacity = fadeIn(frame, 100, 22);
  const cardScale = scaleIn(frame, 100, 24, 0.94);
  const pct = Math.round(
    interpolate(frame, [105, 165], [0, 80], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  return (
    <div
      style={{
        position: "absolute",
        right: "6%",
        top: "24%",
        backgroundColor: "rgba(5, 7, 10, 0.8)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${C.blueLine}`,
        borderRadius: 20,
        padding: "44px 52px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity: cardOpacity,
        transform: `scale(${cardScale})`,
        boxShadow: "0 18px 60px rgba(0, 0, 0, 0.45)",
      }}
    >
      {/* 圆环进度条：borderRadius 圆形 + conic-gradient 进度 + 径向 mask 镂空成环 */}
      <div style={{ position: "relative", width: 240, height: 240 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "12px solid rgba(20, 110, 255, 0.15)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: `conic-gradient(${C.blue} 0% ${pct}%, transparent ${pct}% 100%)`,
            WebkitMask:
              "radial-gradient(farthest-side, transparent calc(100% - 12px), #000 calc(100% - 12px))",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 12px), #000 calc(100% - 12px))",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: C.white,
              letterSpacing: "-0.02em",
              ...CARD_TITLE_EFFECT,
            }}
          >
            {pct}%
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 26,
          fontSize: 28,
          fontWeight: 600,
          color: C.white,
          letterSpacing: "0.02em",
          whiteSpace: "nowrap",
          ...CARD_TITLE_EFFECT,
        }}
      >
        🤝 Profit Split
      </div>
    </div>
  );
};

export const Shot02: React.FC = () => {
  const frame = useCurrentFrame();

  const dashOpacity = fadeIn(frame, 5, 20);
  const dashY = slideUp(frame, 5, 22, 14);

  return (
    <AbsoluteFill style={{ overflow: "hidden", fontFamily: FONT }}>
      {/* Eagle Video Background: Prop Firm Dashboard（原始亮度，无全局蒙版） */}
      <OffthreadVideo
        src={staticFile("ep01/eagle/dashboard_account.mp4")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        muted
      />

      {/* 左侧 Dashboard 卡片：局部深色底板 + 余额指标 + 柱状图 */}
      <div
        style={{
          position: "absolute",
          left: "5%",
          top: "14%",
          width: "30%",
          backgroundColor: "rgba(5, 7, 10, 0.8)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: `1px solid ${C.hairline}`,
          borderRadius: 20,
          padding: 36,
          opacity: dashOpacity,
          transform: `translateY(${dashY}px)`,
          boxShadow: "0 18px 60px rgba(0, 0, 0, 0.45)",
        }}
      >
        <div style={{ fontSize: 24, fontWeight: 600, color: C.muted, letterSpacing: "0.04em" }}>
          💼 账户余额
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: C.white,
            letterSpacing: "-0.02em",
            marginTop: 10,
            ...CARD_TITLE_EFFECT,
          }}
        >
          $100,000
        </div>
        <div style={{ fontSize: 28, fontWeight: 700, color: GREEN, marginTop: 8 }}>
          📈 +2.38%
        </div>

        <MiniBarChart frame={frame} />

        <div style={{ fontSize: 20, color: C.muted, marginTop: 16, letterSpacing: "0.04em" }}>
          📊 近 5 周收益曲线
        </div>
      </div>

      {/* 中间竖排流程节点 + 蓝色竖线连接 */}
      <div
        style={{
          position: "absolute",
          left: "43%",
          top: "15%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <FlowNode label="💰 平台资金" delay={20} frame={frame} />
        <Connector delay={38} frame={frame} />
        <FlowNode label="📈 交易" delay={50} frame={frame} />
        <Connector delay={68} frame={frame} />
        <FlowNode label="💵 盈利" delay={80} frame={frame} />
        <Connector delay={98} frame={frame} />
        <FlowNode label="🤝 Profit Split" delay={110} frame={frame} />
      </div>

      {/* 右侧圆形百分比指标卡片 */}
      <ProfitSplitRing frame={frame} />
    </AbsoluteFill>
  );
};
