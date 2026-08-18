import type { EpisodeConfig } from "../shared/types";
import { ep01Config } from "./EP01/config";

/* ════════════════════════════════════════════════════════════════
 * Episode 注册表
 *
 * 新增 episode 时：
 * 1. 运行 npm run create -- --ep=EP02 --topic="..."
 * 2. 脚手架自动在此文件添加 import 和数组项
 * 3. 在 Root.tsx 中添加对应的 composition 注册
 * ══════════════════════════════════════════════════════════════ */

export const episodes: EpisodeConfig[] = [
  ep01Config,
];
