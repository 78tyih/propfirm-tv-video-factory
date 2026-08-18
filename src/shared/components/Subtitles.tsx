import React from "react";
import { interpolate } from "remotion";
import { C, FONT, hexA } from "../theme";
import type { SubtitleLine } from "../types";

/* ════════════════════════════════════════════════════════════════
 * 字幕系统 · Calm Fintech Editorial · 参数化版
 *
 * 排版规则：
 * - 中英上下分行：上中文主句 / 下英文短译
 * - 少标点：中文不加句号逗号，英文去掉句尾句号
 * - 强调词用黄/橙突出，字号比正文更大
 * - 唯一动效：Fade
 *
 * 数据从 EpisodeConfig.subtitles 注入（不再硬编码）
 * ══════════════════════════════════════════════════════════════ */

/** 风险类关键词用橙色，其余强调词用黄色 */
const ORANGE_WORDS = new Set(["最大回撤", "单日亏损"]);
const highlightColor = (word: string): string =>
  ORANGE_WORDS.has(word) ? C.orange : C.yellow;

const escapeRegExp = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** 把中文主句按高亮词切分为 span 序列；强调词字号放大 + 黄/橙色 */
const renderZh = (text: string, highlights?: string[]): React.ReactNode => {
  if (!highlights || highlights.length === 0) return text;
  const pattern = new RegExp(`(${highlights.map(escapeRegExp).join("|")})`, "g");
  return text.split(pattern).map((part, i) =>
    highlights.includes(part) ? (
      <span
        key={i}
        style={{
          color: highlightColor(part),
          fontSize: 54,
          fontWeight: 800,
          letterSpacing: "0.02em",
          textShadow: `0 0 18px ${hexA(highlightColor(part), 0.35)}, 0 2px 8px rgba(0, 0, 0, 0.55)`,
        }}
      >
        {part}
      </span>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    ),
  );
};

export const Subtitles: React.FC<{ frame: number; data: SubtitleLine[] }> = ({ frame, data }) => {
  const activeLine = data.find((s) => frame >= s.start && frame < s.end);
  if (!activeLine) return null;

  // 唯一的字幕动效：Fade
  const opacity = interpolate(
    frame,
    [activeLine.start, activeLine.start + 5, activeLine.end - 5, activeLine.end],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        position: "absolute",
        bottom: 60,
        left: "50%",
        transform: "translateX(-50%)",
        opacity,
        zIndex: 200,
        fontFamily: FONT,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          backgroundColor: "rgba(5, 7, 10, 0.72)",
          backdropFilter: "blur(10px)",
          borderRadius: 12,
          padding: "18px 38px 16px",
          border: `1px solid ${C.hairline}`,
          boxShadow: "0 6px 24px rgba(0, 0, 0, 0.35)",
        }}
      >
        <div
          style={{
            fontSize: 40,
            fontWeight: 600,
            color: C.white,
            letterSpacing: "0.02em",
            lineHeight: 1.25,
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "baseline",
          }}
        >
          {renderZh(activeLine.zh, activeLine.highlights)}
        </div>
        <div
          style={{
            fontSize: 21,
            fontWeight: 500,
            color: C.muted,
            letterSpacing: "0.04em",
            lineHeight: 1.3,
            marginTop: 8,
            whiteSpace: "nowrap",
          }}
        >
          {activeLine.en}
        </div>
      </div>
    </div>
  );
};
