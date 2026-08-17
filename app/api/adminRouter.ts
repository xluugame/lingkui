import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { env } from "./lib/env";
import {
  createPlayer,
  updatePlayer,
  deletePlayer,
  listAllPlayers,
  getConfig,
  setConfig,
  createSession,
  findSession,
  deleteSession,
} from "./queries/players";
import { getContentOverrides, setContentOverrides } from "./queries/content";
import {
  listPoolItems,
  createPoolItem,
  updatePoolItem,
  deletePoolItem,
  resetPool,
  seedPool,
} from "./queries/bingoItems";
import {
  listFunOrdersAdmin,
  createFunOrder,
  updateFunOrder,
  deleteFunOrder,
  resetFunOrders,
  seedFunOrders,
} from "./queries/funOrders";

/** 趣味单版本 */
const funVersionSchema = z.object({
  name: z.string().min(1, "版本名必填").max(32),
  price: z.string().max(32).default(""),
  note: z.string().max(120).optional(),
  initHp: z.number().int().min(0).max(999).optional(),
  maxHp: z.number().int().min(1).max(999).optional(),
});

/** 趣味单表单 */
const funOrderInput = z.object({
  slug: z.string().min(1, "标识必填").max(32).regex(/^[a-z0-9-]+$/, "标识只能用小写字母、数字、短横线"),
  name: z.string().min(1, "名称必填").max(64),
  summary: z.string().max(200).default(""),
  rules: z.string().max(20000).default(""),
  tool: z.enum(["", "giant-hp"]).default(""),
  versions: z.array(funVersionSchema).max(6).default([]),
  sortOrder: z.number().int().default(0),
  status: z.enum(["online", "offline"]).default("online"),
});

/** 生成会话令牌 */
function makeToken() {
  return (
    Math.random().toString(36).slice(2) +
    Math.random().toString(36).slice(2) +
    Date.now().toString(36)
  );
}

/** 校验会话令牌（Authorization: Bearer xxx 或 body.token） */
async function requireAuth(token?: string) {
  if (!token) throw new Error("未登录");
  const s = await findSession(token);
  if (!s) throw new Error("登录已失效，请重新登录");
}

const gameSchema = z.object({ name: z.string().min(1), rank: z.string() });

const playerInput = z.object({
  name: z.string().min(1, "昵称必填"),
  gender: z.enum(["male", "female"]),
  age: z.number().int().min(16).max(80),
  photo: z.string().default(""),
  photos: z.array(z.string()).default([]),
  videoUrl: z.string().default(""),
  tags: z.array(z.string()).default([]),
  bio: z.string().default(""),
  games: z.array(gameSchema).default([]),
  specialty: z.string().default(""),
  city: z.string().default(""),
  audioUrl: z.string().default(""),
  featured: z.boolean().default(false),
  status: z.enum(["online", "offline"]).default("online"),
  sortOrder: z.number().int().default(0),
});

export const adminRouter = createRouter({
  /** 登录：校验账号密码，返回令牌 */
  login: publicQuery
    .input(z.object({ user: z.string(), pass: z.string() }))
    .mutation(async ({ input }) => {
      if (input.user !== env.adminUser || input.pass !== env.adminPass) {
        throw new Error("账号或密码错误");
      }
      const token = makeToken();
      await createSession(token);
      return { token };
    }),

  /** 退出登录 */
  logout: publicQuery
    .input(z.object({ token: z.string() }))
    .mutation(async ({ input }) => {
      await deleteSession(input.token);
      return { ok: true };
    }),

  /** 校验登录状态 */
  me: publicQuery
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      const s = await findSession(input.token);
      return { authed: !!s };
    }),

  /** 打手列表（含下架） */
  players: publicQuery
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      await requireAuth(input.token);
      return listAllPlayers();
    }),

  /** 新增打手 */
  createPlayer: publicQuery
    .input(z.object({ token: z.string(), data: playerInput }))
    .mutation(async ({ input }) => {
      await requireAuth(input.token);
      const id = await createPlayer(input.data);
      return { id };
    }),

  /** 更新打手 */
  updatePlayer: publicQuery
    .input(z.object({ token: z.string(), id: z.number(), data: playerInput.partial() }))
    .mutation(async ({ input }) => {
      await requireAuth(input.token);
      await updatePlayer(input.id, input.data);
      return { ok: true };
    }),

  /** 删除打手 */
  deletePlayer: publicQuery
    .input(z.object({ token: z.string(), id: z.number() }))
    .mutation(async ({ input }) => {
      await requireAuth(input.token);
      await deletePlayer(input.id);
      return { ok: true };
    }),

  /** 上下架 / 推荐 快速切换 */
  setFlags: publicQuery
    .input(
      z.object({
        token: z.string(),
        id: z.number(),
        status: z.enum(["online", "offline"]).optional(),
        featured: z.boolean().optional(),
        sortOrder: z.number().int().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      await requireAuth(input.token);
      await updatePlayer(input.id, {
        status: input.status,
        featured: input.featured,
        sortOrder: input.sortOrder,
      });
      return { ok: true };
    }),

  /** 读取企微客服链接 */
  getKefu: publicQuery
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      await requireAuth(input.token);
      return { kefuUrl: await getConfig("kefuUrl") };
    }),

  /** 更新企微客服链接 */
  setKefu: publicQuery
    .input(z.object({ token: z.string(), kefuUrl: z.string() }))
    .mutation(async ({ input }) => {
      await requireAuth(input.token);
      await setConfig("kefuUrl", input.kefuUrl);
      return { ok: true };
    }),

  /* ---------- 站点文案 / 图片 ---------- */

  /** 读取全部文案覆盖值 */
  content: publicQuery
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      await requireAuth(input.token);
      return getContentOverrides();
    }),

  /** 批量保存文案覆盖值（空字符串 = 恢复默认） */
  setContent: publicQuery
    .input(z.object({ token: z.string(), entries: z.record(z.string(), z.string()) }))
    .mutation(async ({ input }) => {
      await requireAuth(input.token);
      await setContentOverrides(input.entries);
      return { ok: true };
    }),

  /* ---------- Bingo 图库 ---------- */

  /** 列出某个图库的条目 */
  bingoItems: publicQuery
    .input(z.object({ token: z.string(), pool: z.enum(["classic", "allred", "joker"]) }))
    .query(async ({ input }) => {
      await requireAuth(input.token);
      return listPoolItems(input.pool);
    }),

  /** 新增图库条目 */
  bingoItemCreate: publicQuery
    .input(
      z.object({
        token: z.string(),
        pool: z.enum(["classic", "allred", "joker"]),
        name: z.string().min(1, "名称必填").max(64),
        img: z.string().max(400_000).default(""),
      }),
    )
    .mutation(async ({ input }) => {
      await requireAuth(input.token);
      await createPoolItem(input.pool, input.name, input.img);
      return { ok: true };
    }),

  /** 更新图库条目（改名 / 换图） */
  bingoItemUpdate: publicQuery
    .input(
      z.object({
        token: z.string(),
        id: z.number(),
        pool: z.enum(["classic", "allred", "joker"]),
        name: z.string().min(1).max(64).optional(),
        img: z.string().max(400_000).optional(),
      }),
    )
    .mutation(async ({ input }) => {
      await requireAuth(input.token);
      await updatePoolItem(input.id, input.pool, { name: input.name, img: input.img });
      return { ok: true };
    }),

  /** 删除图库条目（删空后自动回退内置默认库） */
  bingoItemDelete: publicQuery
    .input(z.object({ token: z.string(), id: z.number() }))
    .mutation(async ({ input }) => {
      await requireAuth(input.token);
      await deletePoolItem(input.id);
      return { ok: true };
    }),

  /** 恢复某个图库为内置默认 */
  bingoPoolReset: publicQuery
    .input(z.object({ token: z.string(), pool: z.enum(["classic", "allred", "joker"]) }))
    .mutation(async ({ input }) => {
      await requireAuth(input.token);
      await resetPool(input.pool);
      return { ok: true };
    }),

  /** 把内置默认图库导入为可编辑的自定义库 */
  bingoPoolSeed: publicQuery
    .input(z.object({ token: z.string(), pool: z.enum(["classic", "allred", "joker"]) }))
    .mutation(async ({ input }) => {
      await requireAuth(input.token);
      await seedPool(input.pool);
      return { ok: true };
    }),

  /* ---------- 趣味单管理 ---------- */

  /** 列出全部趣味单（source 标记当前生效的是数据库还是内置默认） */
  funOrders: publicQuery
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      await requireAuth(input.token);
      return listFunOrdersAdmin();
    }),

  /** 新增趣味单 */
  funOrderCreate: publicQuery
    .input(z.object({ token: z.string(), data: funOrderInput }))
    .mutation(async ({ input }) => {
      await requireAuth(input.token);
      await createFunOrder(input.data);
      return { ok: true };
    }),

  /** 更新趣味单 */
  funOrderUpdate: publicQuery
    .input(z.object({ token: z.string(), id: z.number(), data: funOrderInput }))
    .mutation(async ({ input }) => {
      await requireAuth(input.token);
      await updateFunOrder(input.id, input.data);
      return { ok: true };
    }),

  /** 删除趣味单（删空后自动回退内置默认） */
  funOrderDelete: publicQuery
    .input(z.object({ token: z.string(), id: z.number() }))
    .mutation(async ({ input }) => {
      await requireAuth(input.token);
      await deleteFunOrder(input.id);
      return { ok: true };
    }),

  /** 恢复内置默认趣味单 */
  funOrdersReset: publicQuery
    .input(z.object({ token: z.string() }))
    .mutation(async ({ input }) => {
      await requireAuth(input.token);
      await resetFunOrders();
      return { ok: true };
    }),

  /** 把内置默认趣味单导入为可编辑的自定义库 */
  funOrdersSeed: publicQuery
    .input(z.object({ token: z.string() }))
    .mutation(async ({ input }) => {
      await requireAuth(input.token);
      await seedFunOrders();
      return { ok: true };
    }),
});
