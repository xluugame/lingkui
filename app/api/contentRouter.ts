import { createRouter, publicQuery } from "./middleware";
import { getContentOverrides } from "./queries/content";

export const contentRouter = createRouter({
  /** 前台启动时拉取全部文案/图片覆盖值（无需登录；失败时前端用默认文案） */
  all: publicQuery.query(() => getContentOverrides()),
});
