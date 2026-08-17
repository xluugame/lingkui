import { createRouter, publicQuery } from "./middleware";
import { listOnlinePlayers } from "./queries/players";

/**
 * 前台打手查询（公开，无需登录）
 * 数据库不可达时返回空数组，前端自动回退到演示数据。
 */
export const playerRouter = createRouter({
  list: publicQuery.query(async () => {
    try {
      return await listOnlinePlayers();
    } catch {
      // DB 未就绪：返回空，前端回退演示数据
      return [];
    }
  }),
});
