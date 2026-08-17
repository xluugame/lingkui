import { mysqlTable, serial, varchar, int, json, text, timestamp } from "drizzle-orm/mysql-core";

/**
 * Bingo 房间表
 * 一个房间 = 一局 Bingo 趣味单（老板生成棋盘 → 确认 → 打手进房协作）
 */
export const bingoRooms = mysqlTable("bingo_rooms", {
  id: serial("id").primaryKey(),
  /** 6 位房间号，打手凭此进房 */
  code: varchar("code", { length: 8 }).notNull().unique(),
  /** 棋盘尺寸：8 = 8x8 经典 Bingo；6 = 6x6 全大红 Bingo */
  boardSize: int("boardSize").notNull(),
  /** 玩法模式：classic = 经典 Bingo；allred = 全大红 Bingo */
  mode: varchar("mode", { length: 16 }).notNull(),
  /** 目标连线数：3 / 4 / 5 */
  targetLines: int("targetLines").notNull(),
  /** 允许生成的总次数（= 目标连线数） */
  maxGenerations: int("maxGenerations").notNull(),
  /** 已用生成次数 */
  generationsUsed: int("generationsUsed").notNull().default(1),
  /** 状态：draft = 生成/挑选棋盘阶段；playing = 房间已创建，双方协作中；finished = 达成目标连线 */
  status: varchar("status", { length: 16 }).notNull().default("draft"),
  /** 当前棋盘：Cell[] = { text: string; marked: boolean; markedBy: "boss" | "player" | null } */
  cells: json("cells").notNull(),
  /** 历史棋盘（文字数组的数组），老板可回退到任意一版 */
  history: json("history").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BingoRoom = typeof bingoRooms.$inferSelect;
export type InsertBingoRoom = typeof bingoRooms.$inferInsert;

/**
 * Bingo 图库表（后台可自由增删改）
 * pool 分组：classic = 8x8 经典棋盘；allred = 6x6 全大红棋盘；joker = 赖子
 * 某个 pool 一行都没有时，前台回退到代码里的内置默认图库
 * img 可以是图片 URL，也可以是后台上传后存的 base64 data URL
 */
export const bingoItems = mysqlTable("bingo_items", {
  id: serial("id").primaryKey(),
  pool: varchar("pool", { length: 16 }).notNull(),
  /** 物品名称 */
  name: varchar("name", { length: 64 }).notNull(),
  /** 图片（URL 或 data URL，可为空 → 格子显示纯文字） */
  img: text("img"),
  /** 排序：越小越靠前 */
  sortOrder: int("sortOrder").notNull().default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type BingoItem = typeof bingoItems.$inferSelect;
export type InsertBingoItem = typeof bingoItems.$inferInsert;

/**
 * 趣味单表（后台可自由增删改）
 * 一行都没有时，前台回退到代码里的内置默认趣味单（小巨人单）
 * versions 为 JSON 文本：FunVersion[]
 */
export const funOrders = mysqlTable("fun_orders", {
  id: serial("id").primaryKey(),
  /** URL 标识，如 "giant" → /game/delta-force/fun/giant */
  slug: varchar("slug", { length: 32 }).notNull(),
  name: varchar("name", { length: 64 }).notNull(),
  /** 卡片一句话简介 */
  summary: varchar("summary", { length: 200 }).notNull().default(""),
  /** 完整规则（纯文本，支持换行） */
  rules: text("rules"),
  /** 互动工具："" = 纯规则页；"giant-hp" = 小巨人血量器 */
  tool: varchar("tool", { length: 16 }).notNull().default(""),
  /** 版本列表 JSON：[{ name, price, note?, initHp?, maxHp? }] */
  versions: text("versions"),
  sortOrder: int("sortOrder").notNull().default(0),
  /** online / offline */
  status: varchar("status", { length: 16 }).notNull().default("online"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type FunOrder = typeof funOrders.$inferSelect;
export type InsertFunOrder = typeof funOrders.$inferInsert;

/**
 * 趣味单房间表（小巨人血量器等共享工具的实时状态）
 * 打手 / 老板凭 6 位房间号进入同一房间，双方都可操作
 */
export const funRooms = mysqlTable("fun_rooms", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 8 }).notNull().unique(),
  /** 对应趣味单 slug */
  slug: varchar("slug", { length: 32 }).notNull(),
  /** 选用的版本下标 */
  versionIndex: int("versionIndex").notNull().default(0),
  /** 当前血量 */
  hp: int("hp").notNull().default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type FunRoom = typeof funRooms.$inferSelect;
export type InsertFunRoom = typeof funRooms.$inferInsert;

/**
 * 打手表
 * 后台录入，前台列表/详情读取。文件字段（photo/photos/videoUrl/audioUrl）存 URL 字符串。
 */
export const players = mysqlTable("players", {
  id: serial("id").primaryKey(),
  /** 昵称 */
  name: varchar("name", { length: 64 }).notNull(),
  /** 性别：male / female */
  gender: varchar("gender", { length: 8 }).notNull(),
  /** 年龄 */
  age: int("age").notNull(),
  /** 头像 URL */
  photo: varchar("photo", { length: 512 }).notNull().default(""),
  /** 照片墙 URL 列表：string[] */
  photos: json("photos").notNull(),
  /** 介绍视频 URL（可选） */
  videoUrl: varchar("videoUrl", { length: 512 }).notNull().default(""),
  /** 性格标签：string[] */
  tags: json("tags").notNull(),
  /** 个人简介 */
  bio: text("bio"),
  /** 主玩游戏：[{ name, rank }] */
  games: json("games").notNull(),
  /** 擅长英雄/位置 */
  specialty: varchar("specialty", { length: 255 }).notNull().default(""),
  /** 所在城市 */
  city: varchar("city", { length: 64 }).notNull().default(""),
  /** 试音音频 URL */
  audioUrl: varchar("audioUrl", { length: 512 }).notNull().default(""),
  /** 是否推荐（首页/列表置顶） */
  featured: int("featured").notNull().default(0), // 0/1
  /** 上架状态：online / offline */
  status: varchar("status", { length: 16 }).notNull().default("online"),
  /** 排序权重：越大越靠前 */
  sortOrder: int("sortOrder").notNull().default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type DbPlayer = typeof players.$inferSelect;
export type InsertDbPlayer = typeof players.$inferInsert;

/**
 * 站点配置表（key-value）
 * 存企微链接等可在后台修改的全局配置
 */
export const siteConfig = mysqlTable("site_config", {
  id: serial("id").primaryKey(),
  k: varchar("k", { length: 64 }).notNull().unique(),
  v: text("v"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SiteConfig = typeof siteConfig.$inferSelect;

/**
 * 管理员会话表（简单的令牌登录）
 */
export const adminSessions = mysqlTable("admin_sessions", {
  id: serial("id").primaryKey(),
  token: varchar("token", { length: 64 }).notNull().unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AdminSession = typeof adminSessions.$inferSelect;
