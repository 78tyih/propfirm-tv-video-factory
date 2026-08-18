import React from "react";
import { Composition } from "remotion";
import { EP01Video } from "./episodes/EP01/Composition";
import { ep01Config } from "./episodes/EP01/config";

/* ════════════════════════════════════════════════════════════════
 * Remotion Root · 动态注册所有 Episode
 *
 * 新增 episode 时在此添加：
 *   1. import { EPXXVideo } from "./episodes/EPXX/Composition";
 *   2. import { epxxConfig } from "./episodes/EPXX/config";
 *   3. 添加 <Composition> 组件
 *
 * 脚手架 CLI 会自动完成上述步骤。
 * ══════════════════════════════════════════════════════════════ */

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id={ep01Config.compositionId}
        component={EP01Video}
        durationInFrames={ep01Config.durationInFrames}
        fps={ep01Config.fps}
        width={ep01Config.width}
        height={ep01Config.height}
      />
    </>
  );
};
