import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getFunOrder, listFunOrders } from "./queries/funOrders";
import {
  createFunRoom,
  getFunRoom,
  pressFunButton,
  resetFunRoom,
} from "./queries/funRooms";

export const funRouter = createRouter({
  /** 趣味单卡片列表（三角洲行动分区页） */
  orders: publicQuery.query(() => listFunOrders()),

  /** 单个趣味单详情（规则 + 版本） */
  order: publicQuery
    .input(z.object({ slug: z.string().min(1).max(32) }))
    .query(async ({ input }) => {
      const order = await getFunOrder(input.slug);
      if (!order) throw new Error("玩法不存在或已下架");
      return order;
    }),

  /** 创建互动房间（选版本开局，生成 6 位房间号） */
  createRoom: publicQuery
    .input(z.object({ slug: z.string().min(1).max(32), versionIndex: z.number().int().min(0).max(9) }))
    .mutation(({ input }) => createFunRoom(input.slug, input.versionIndex)),

  /** 查询房间状态（双方轮询同步） */
  room: publicQuery
    .input(z.object({ code: z.string().min(4).max(8) }))
    .query(({ input }) => getFunRoom(input.code)),

  /** 按规则按钮加减血量 */
  press: publicQuery
    .input(z.object({ code: z.string().min(4).max(8), key: z.string().min(1).max(16) }))
    .mutation(({ input }) => pressFunButton(input.code, input.key)),

  /** 重新开局（血量回初始值） */
  resetRoom: publicQuery
    .input(z.object({ code: z.string().min(4).max(8) }))
    .mutation(({ input }) => resetFunRoom(input.code)),
});
