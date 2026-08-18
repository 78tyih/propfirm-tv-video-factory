import React from "react";
import { AbsoluteFill, useCurrentFrame, Audio, Sequence, staticFile, Img } from "remotion";
import { Shot01 } from "./shots/Shot01";
import { Shot02 } from "./shots/Shot02";
import { Shot03 } from "./shots/Shot03";
import { Shot04 } from "./shots/Shot04";
import { Shot05 } from "./shots/Shot05";
import { Shot06 } from "./shots/Shot06";
import { Shot07 } from "./shots/Shot07";
import { Shot08 } from "./shots/Shot08";
import { Shot09 } from "./shots/Shot09";
import { AvatarCircleFrame } from "../../shared/components/AvatarCircle";
import { Subtitles } from "../../shared/components/Subtitles";
import { ep01Config } from "./config";

/* ════════════════════════════════════════════════════════════════
 * EP01 主合成 · Calm Fintech Editorial
 *
 * 使用共享设计系统 + 参数化数字人/字幕
 * Shot 组件在 episodes/EP01/shots/ 下
 * ══════════════════════════════════════════════════════════════ */

const SHOT_COMPONENTS: Record<string, React.FC> = {
  Shot01, Shot02, Shot03, Shot04, Shot05,
  Shot06, Shot07, Shot08, Shot09,
};

export const EP01Video: React.FC = () => {
  const frame = useCurrentFrame();
  const config = ep01Config;

  return (
    <AbsoluteFill style={{ backgroundColor: "#05070A" }}>
      {/* 暗色工作室底板 */}
      {config.backgroundSrc && (
        <Img
          src={staticFile(config.backgroundSrc)}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.5)",
          }}
        />
      )}

      {/* 音频 */}
      <Audio src={staticFile(config.audioSrc)} />

      {/* Shot 序列 */}
      {config.shots.map((shot) => {
        const Component = SHOT_COMPONENTS[shot.component];
        if (!Component) return null;
        return (
          <Sequence key={shot.id} from={shot.from} durationInFrames={shot.durationInFrames}>
            <Component />
          </Sequence>
        );
      })}

      {/* 数字人 */}
      <AvatarCircleFrame frame={frame} config={config.avatar} />

      {/* 字幕 */}
      <Subtitles frame={frame} data={config.subtitles} />
    </AbsoluteFill>
  );
};
