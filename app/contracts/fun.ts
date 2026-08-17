/**
 * ============================================================
 * ★ 趣味单配置（前后端共用）★
 *
 * 每个趣味单 = 一张卡片 + 一个详情页（完整规则 + 可选的互动工具）。
 * 数据库 fun_orders 表有数据时以数据库为准（后台可增删改）；
 * 数据库为空时回退到下面的 FUN_ORDER_DEFAULTS。
 *
 * ▶ 互动工具 tool：
 *   ""         无互动工具，纯规则展示页
 *   "giant-hp" 小巨人血量器（打手/老板共享房间，按钮加减血量）
 * ============================================================
 */

/** 趣味单版本（如 体验版 / 进阶版） */
export interface FunVersion {
  name: string;
  /** 价格文案，如 "¥ 68"；留空显示「咨询客服」 */
  price: string;
  /** 版本补充说明（可选） */
  note?: string;
  /** 小巨人血量器参数：初始血量 / 血量上限 */
  initHp?: number;
  maxHp?: number;
}

/** 互动工具类型 */
export type FunTool = "" | "giant-hp";

/** 血量器按钮（后台可为每个玩法自定义，key 在保存时自动生成） */
export interface HpButton {
  key: string;
  label: string;
  delta: number;
}

/** 小巨人血量器默认按钮 */
export const GIANT_HP_BUTTONS: HpButton[] = [
  { key: "fail", label: "撤离失败", delta: 2 },
  { key: "w700", label: "撤离成功 700W+", delta: -5 },
  { key: "w1000", label: "撤离成功 1000W+", delta: -5 },
  { key: "w1200", label: "撤离成功 1200W+", delta: -5 },
];

/** 趣味单定义 */
export interface FunOrderDef {
  slug: string;
  name: string;
  /** 卡片一句话简介 */
  summary: string;
  /** 卡片规则要点（每条一行，显示在卡片中部） */
  cardRules: string[];
  /** 完整规则（纯文本，支持换行） */
  rules: string;
  tool: FunTool;
  /** 血量器按钮（tool = giant-hp 时生效；空数组用默认四键） */
  hpButtons?: HpButton[];
  versions: FunVersion[];
  sortOrder: number;
}

/** 取玩法的有效血量按钮：自定义优先，否则默认四键 */
export function effectiveHpButtons(o: { hpButtons?: HpButton[] }): HpButton[] {
  return o.hpButtons?.length ? o.hpButtons : GIANT_HP_BUTTONS;
}

export const FUN_TOOL_LABELS: Record<FunTool, string> = {
  "": "无互动工具（纯规则页）",
  "giant-hp": "小巨人血量器（共享房间）",
};

/** 内置默认趣味单：小巨人单 */
export const FUN_ORDER_DEFAULTS: FunOrderDef[] = [
  {
    slug: "giant",
    name: "小巨人单",
    summary: "血量挑战：撤离失败加血、大额撤离扣血，清空血量即算通关",
    cardRules: [
      "体验版 10 点血 / 进阶版 25 点血",
      "撤离失败 +2，大额撤离 -5",
      "血量清零即完成挑战",
      "丢包、双倒血量照算，金额不计",
      "房间码进房，不限人数实时同步",
    ],
    rules: `【玩法简介】
打手携带初始血量开局。撤离失败加血、达成大额撤离扣血，血量清零即完成挑战。

【血量规则】
· 初始血量：体验版 10 点 / 进阶版 25 点
· 血量上限：体验版 20 点 / 进阶版 35 点
· 撤离失败：+2 点
· 撤离成功 700W 以上：-5 点
· 撤离成功 1000W 以上：-5 点
· 撤离成功 1200W 以上：-5 点

【特殊说明】
· 丢包、打手双倒：血量正常加减，但当局金额不计入
· 若血量已清空但保底金额不够，则转为正常护航，打满保底为止
· 默认打手选图`,
    tool: "giant-hp",
    versions: [
      { name: "体验版", price: "", initHp: 10, maxHp: 20 },
      { name: "进阶版", price: "", initHp: 25, maxHp: 35 },
    ],
    sortOrder: 0,
  },
];
