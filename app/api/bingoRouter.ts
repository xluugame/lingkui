import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import {
  findRoomByCode,
  createRoom,
  regenerateRoom,
  rollbackRoom,
  confirmRoom,
  toggleCell,
  useJoker,
} from "./queries/bingo";
import { BINGO_MODES, TARGET_LINES_OPTIONS } from "@contracts/bingo";
import { getPoolItems } from "./queries/bingoItems";

const codeInput = z.object({ code: z.string().min(4).max(8) });

async function mustFind(code: string) {
  const room = await findRoomByCode(code);
  if (!room) throw new Error("房间不存在，请检查房间号");
  return room;
}

export const bingoRouter = createRouter({
  /** 可用玩法与连线选项（前端渲染入口卡片用） */
  meta: publicQuery.query(async () => ({
    modes: Object.values(BINGO_MODES).map((m) => ({
      id: m.id,
      boardSize: m.boardSize,
      name: m.name,
      desc: m.desc,
    })),
    targetLinesOptions: [...TARGET_LINES_OPTIONS],
    /** 当前生效的赖子列表（图库自定义后实时反映到房间页） */
    jokers: await getPoolItems("joker"),
  })),

  /** 老板开单：选玩法 + 连线数，生成第一版棋盘并建房 */
  create: publicQuery
    .input(
      z.object({
        mode: z.enum(["classic", "allred"]),
        targetLines: z
          .number()
          .refine((n) => (TARGET_LINES_OPTIONS as readonly number[]).includes(n), "连线数只能是 3 / 4 / 5"),
      }),
    )
    .mutation(({ input }) => createRoom(input.mode, input.targetLines)),

  /** 查询房间（前端轮询实现双人实时同步） */
  get: publicQuery.input(codeInput).query(({ input }) => mustFind(input.code)),

  /** 重新生成棋盘 */
  regenerate: publicQuery
    .input(codeInput)
    .mutation(async ({ input }) => regenerateRoom(await mustFind(input.code))),

  /** 回退到历史棋盘 */
  rollback: publicQuery
    .input(codeInput.extend({ historyIndex: z.number().int().min(0) }))
    .mutation(async ({ input }) => rollbackRoom(await mustFind(input.code), input.historyIndex)),

  /** 老板确认棋盘，正式创建房间 */
  confirm: publicQuery
    .input(codeInput)
    .mutation(async ({ input }) => confirmRoom(await mustFind(input.code))),

  /** 标记/取消格子（老板与打手共用） */
  toggle: publicQuery
    .input(codeInput.extend({ index: z.number().int().min(0), by: z.enum(["boss", "player"]) }))
    .mutation(async ({ input }) => toggleCell(await mustFind(input.code), input.index, input.by)),

  /** 用赖子点亮任意格子（赖子列表由图库决定，后台可改） */
  joker: publicQuery
    .input(
      codeInput.extend({
        index: z.number().int().min(0),
        joker: z.string().min(1).max(64),
      }),
    )
    .mutation(async ({ input }) => useJoker(await mustFind(input.code), input.index, input.joker)),
});
