/**
 * ============================================================
 * ★ Bingo 棋盘内容配置（前后端共用）★
 *
 * 下面两个数组就是棋盘格子内容的"题库"。
 * 随机生成棋盘时，系统从对应题库中随机抽取格子。
 *
 * ▶ 每条内容的格式：
 *   { name: "物品名", img: "/bingo/classic/item-01.webp" }
 *   name 必填（格子角标 + 历史记录用），img 可选（格子图片）。
 *
 * ▶ 新增/替换图片的方法：
 *   把图片文件放进 public/bingo/classic/（建议 256×256 的 webp/png，
 *   透明底效果最佳），然后在下方数组里加一条对应记录即可。
 *   题库条数 ≥ 棋盘格数时不会重复抽取（8x8=64 格，6x6=36 格）；
 *   不足格数时会随机重复补足。条数越多，每局棋盘差异越大。
 * ============================================================
 */

/** 题库条目：name 为物品名，img 为格子图片（可选） */
export interface BingoPoolItem {
  name: string;
  img?: string;
}

/** 8x8 经典 Bingo 题库（三角洲行动·大红收集品 49 件，正式素材） */
export const BINGO_POOL_CLASSIC: BingoPoolItem[] = [
  { name: "天圆地方", img: "/bingo/classic/item-01.webp" },
  { name: "纵横", img: "/bingo/classic/item-02.webp" },
  { name: "万足金条", img: "/bingo/classic/item-03.webp" },
  { name: "万金泪冠", img: "/bingo/classic/item-04.webp" },
  { name: "便携军用雷达", img: "/bingo/classic/item-05.webp" },
  { name: "便携式生命支持系统", img: "/bingo/classic/item-06.webp" },
  { name: "克劳迪乌斯半身像", img: "/bingo/classic/item-07.webp" },
  { name: "军用信息终端", img: "/bingo/classic/item-08.webp" },
  { name: "军用控制终端", img: "/bingo/classic/item-09.webp" },
  { name: "军用无人机", img: "/bingo/classic/item-10.webp" },
  { name: "军用炮弹", img: "/bingo/classic/item-11.webp" },
  { name: "军用电台", img: "/bingo/classic/item-12.webp" },
  { name: "刀片服务器", img: "/bingo/classic/item-13.webp" },
  { name: "动力电池组", img: "/bingo/classic/item-14.webp" },
  { name: "名窑瓷器", img: "/bingo/classic/item-15.webp" },
  { name: "名贵机械表", img: "/bingo/classic/item-16.webp" },
  { name: "呼吸机", img: "/bingo/classic/item-17.webp" },
  { name: "奥莉薇娅香槟", img: "/bingo/classic/item-18.webp" },
  { name: "定位接收器", img: "/bingo/classic/item-19.webp" },
  { name: "实验数据", img: "/bingo/classic/item-20.webp" },
  { name: "强力吸尘器", img: "/bingo/classic/item-21.webp" },
  { name: "强化碳纤维板", img: "/bingo/classic/item-22.webp" },
  { name: "微型反应炉", img: "/bingo/classic/item-23.webp" },
  { name: "恒星敏感器", img: "/bingo/classic/item-24.webp" },
  { name: "扫拖一体机器人", img: "/bingo/classic/item-25.webp" },
  { name: "摄影机", img: "/bingo/classic/item-26.webp" },
  { name: "曼德尔超算单元", img: "/bingo/classic/item-27.webp" },
  { name: "棘龙爪化石", img: "/bingo/classic/item-28.webp" },
  { name: "步战车模型", img: "/bingo/classic/item-29.webp" },
  { name: "滑膛枪展品", img: "/bingo/classic/item-30.webp" },
  { name: "潮汐监狱地图", img: "/bingo/classic/item-31.webp" },
  { name: "电子脚镣", img: "/bingo/classic/item-32.webp" },
  { name: "笔记本电脑", img: "/bingo/classic/item-33.webp" },
  { name: "红卡", img: "/bingo/classic/item-34.webp" },
  { name: "绝密服务器", img: "/bingo/classic/item-35.webp" },
  { name: "试制聚变供能单元", img: "/bingo/classic/item-36.webp" },
  { name: "赛伊德的怀表", img: "/bingo/classic/item-37.webp" },
  { name: "超声波切割刀", img: "/bingo/classic/item-38.webp" },
  { name: "量子存储", img: "/bingo/classic/item-39.webp" },
  { name: "鎏金卡牌", img: "/bingo/classic/item-40.webp" },
  { name: "雷斯的留声机", img: "/bingo/classic/item-41.webp" },
  { name: "飞秒激光器", img: "/bingo/classic/item-42.webp" },
  { name: "飞行记录仪", img: "/bingo/classic/item-43.webp" },
  { name: "高能瓦斯罐", img: "/bingo/classic/item-44.webp" },
  { name: "高速磁盘阵列", img: "/bingo/classic/item-45.webp" },
  { name: "黄金瞪羚", img: "/bingo/classic/item-46.webp" },
  { name: "黄金鳄鱼头雕像", img: "/bingo/classic/item-47.webp" },
  { name: "Alpha脑机实验数据-渡鸦", img: "/bingo/classic/item-48.webp" },
  { name: "ECMO", img: "/bingo/classic/item-49.webp" },
  { name: "显卡", img: "/bingo/classic/item-50.webp" },
  { name: "医疗机械人", img: "/bingo/classic/item-51.webp" },
  { name: "已封存音源", img: "/bingo/classic/item-52.webp" },
  { name: "印象派名画", img: "/bingo/classic/item-53.webp" },
  { name: "鱼子酱", img: "/bingo/classic/item-54.webp" },
  { name: "云存储阵列", img: "/bingo/classic/item-55.webp" },
  { name: "主战坦克模型", img: "/bingo/classic/item-56.webp" },
  { name: "装甲车电池", img: "/bingo/classic/item-57.webp" },
  { name: "自动体外除颤器", img: "/bingo/classic/item-58.webp" },
  { name: "非洲之心", img: "/bingo/classic/item-59.webp" },
  { name: "复苏呼吸机", img: "/bingo/classic/item-60.webp" },
  { name: "海洋之泪", img: "/bingo/classic/item-61.webp" },
];

/** 赖子（万能牌）：对局中可用其点亮棋盘上任意格子，无需该物品本身在棋盘上 */
export const BINGO_JOKERS: BingoPoolItem[] = [
  { name: "非洲之心", img: "/bingo/classic/item-59.webp" },
  { name: "复苏呼吸机", img: "/bingo/classic/item-60.webp" },
  { name: "海洋之泪", img: "/bingo/classic/item-61.webp" },
];

/** 判断一个格子是否被赖子点亮 */
export function isJokerMark(cell: Pick<BingoCell, "joker">): boolean {
  return !!cell.joker;
}

/** 6x6 全大红 Bingo 题库（每格都是大红目标；共 41 件，每局随机抽取 36 件） */
export const BINGO_POOL_ALLRED: BingoPoolItem[] = [
  { name: "ECMO", img: "/bingo/allred/item-01.webp" },
  { name: "天圆地方", img: "/bingo/allred/item-02.webp" },
  { name: "纵横", img: "/bingo/allred/item-03.webp" },
  { name: "万金泪冠", img: "/bingo/allred/item-04.webp" },
  { name: "主战坦克模型", img: "/bingo/allred/item-05.webp" },
  { name: "云存储阵列", img: "/bingo/allred/item-06.webp" },
  { name: "便携军用雷达", img: "/bingo/allred/item-07.webp" },
  { name: "便携式生命支持系统", img: "/bingo/allred/item-08.webp" },
  { name: "克劳迪乌斯半身像", img: "/bingo/allred/item-09.webp" },
  { name: "军用信息终端", img: "/bingo/allred/item-10.webp" },
  { name: "军用无人机", img: "/bingo/allred/item-11.webp" },
  { name: "军用炮弹", img: "/bingo/allred/item-12.webp" },
  { name: "军用电台", img: "/bingo/allred/item-13.webp" },
  { name: "刀片服务器", img: "/bingo/allred/item-14.webp" },
  { name: "动力电池组", img: "/bingo/allred/item-15.webp" },
  { name: "医疗机械人", img: "/bingo/allred/item-16.webp" },
  { name: "印象派名画", img: "/bingo/allred/item-17.webp" },
  { name: "名窑瓷器", img: "/bingo/allred/item-18.webp" },
  { name: "呼吸机", img: "/bingo/allred/item-19.webp" },
  { name: "已封存音源", img: "/bingo/allred/item-20.webp" },
  { name: "强力吸尘器", img: "/bingo/allred/item-21.webp" },
  { name: "强化碳纤维板", img: "/bingo/allred/item-22.webp" },
  { name: "微型反应炉", img: "/bingo/allred/item-23.webp" },
  { name: "扫拖一体机器人", img: "/bingo/allred/item-24.webp" },
  { name: "摄影机", img: "/bingo/allred/item-25.webp" },
  { name: "曼德尔超算单元", img: "/bingo/allred/item-26.webp" },
  { name: "步战车模型", img: "/bingo/allred/item-27.webp" },
  { name: "滑膛枪展品", img: "/bingo/allred/item-28.webp" },
  { name: "笔记本电脑", img: "/bingo/allred/item-29.webp" },
  { name: "红卡", img: "/bingo/allred/item-30.webp" },
  { name: "绝密服务器", img: "/bingo/allred/item-31.webp" },
  { name: "自动体外除颤器", img: "/bingo/allred/item-32.webp" },
  { name: "装甲车电池", img: "/bingo/allred/item-33.webp" },
  { name: "试制聚变供能单元", img: "/bingo/allred/item-34.webp" },
  { name: "雷斯的留声机", img: "/bingo/allred/item-35.webp" },
  { name: "飞秒激光器", img: "/bingo/allred/item-36.webp" },
  { name: "飞行记录仪", img: "/bingo/allred/item-37.webp" },
  { name: "高能瓦斯罐", img: "/bingo/allred/item-38.webp" },
  { name: "高速磁盘阵列", img: "/bingo/allred/item-39.webp" },
  { name: "黄金瞪羚", img: "/bingo/allred/item-40.webp" },
  { name: "黄金鳄鱼头雕像", img: "/bingo/allred/item-41.webp" },
];

/** 棋盘类型（同属「Bingo 连线」玩法） */
export const BINGO_MODES = {
  classic: {
    id: "classic" as const,
    boardSize: 8,
    name: "经典棋盘",
    desc: "8×8 棋盘 · 64 格大红收集",
    pool: BINGO_POOL_CLASSIC,
  },
  allred: {
    id: "allred" as const,
    boardSize: 6,
    name: "全大红棋盘",
    desc: "6×6 棋盘 · 36 格大红",
    pool: BINGO_POOL_ALLRED,
  },
};
export type BingoModeId = keyof typeof BINGO_MODES;

/** 目标连线数选项（生成次数 = 连线数） */
export const TARGET_LINES_OPTIONS = [3, 4, 5] as const;

/** 图库分组：经典棋盘 / 全大红棋盘 / 赖子 */
export type BingoPoolId = "classic" | "allred" | "joker";
export const BINGO_POOL_LABELS: Record<BingoPoolId, string> = {
  classic: "经典棋盘（8×8）",
  allred: "全大红棋盘（6×6）",
  joker: "赖子 · 万能牌",
};
/** 各图库的内置默认物品（数据库没有自定义条目时回退到这些） */
export const BINGO_POOL_DEFAULTS: Record<BingoPoolId, BingoPoolItem[]> = {
  classic: BINGO_POOL_CLASSIC,
  allred: BINGO_POOL_ALLRED,
  joker: BINGO_JOKERS,
};

/** 单个格子的状态 */
export interface BingoCell {
  text: string;
  /** 格子图片（可选，有图时格子优先显示图片） */
  img?: string;
  marked: boolean;
  markedBy: "boss" | "player" | null;
  /** 点亮该格的赖子名称（赖子格保留原物品展示，不可手动取消） */
  joker?: string;
}

/** 计算当前已完成的连线数（行 + 列 + 两条对角线） */
export function countCompletedLines(cells: BingoCell[], size: number): number {
  const at = (r: number, c: number) => cells[r * size + c];
  let lines = 0;
  // 行
  for (let r = 0; r < size; r++) {
    let ok = true;
    for (let c = 0; c < size; c++) if (!at(r, c)?.marked) { ok = false; break; }
    if (ok) lines++;
  }
  // 列
  for (let c = 0; c < size; c++) {
    let ok = true;
    for (let r = 0; r < size; r++) if (!at(r, c)?.marked) { ok = false; break; }
    if (ok) lines++;
  }
  // 主对角线
  let d1 = true;
  for (let i = 0; i < size; i++) if (!at(i, i)?.marked) { d1 = false; break; }
  if (d1) lines++;
  // 副对角线
  let d2 = true;
  for (let i = 0; i < size; i++) if (!at(i, size - 1 - i)?.marked) { d2 = false; break; }
  if (d2) lines++;
  return lines;
}

/** 计算每个格子是否处于"已完成连线"上（用于高亮显示） */
export function getWinningCells(cells: BingoCell[], size: number): boolean[] {
  const win = new Array(cells.length).fill(false);
  const at = (r: number, c: number) => r * size + c;
  for (let r = 0; r < size; r++) {
    let ok = true;
    for (let c = 0; c < size; c++) if (!cells[at(r, c)]?.marked) { ok = false; break; }
    if (ok) for (let c = 0; c < size; c++) win[at(r, c)] = true;
  }
  for (let c = 0; c < size; c++) {
    let ok = true;
    for (let r = 0; r < size; r++) if (!cells[at(r, c)]?.marked) { ok = false; break; }
    if (ok) for (let r = 0; r < size; r++) win[at(r, c)] = true;
  }
  let d1 = true;
  for (let i = 0; i < size; i++) if (!cells[at(i, i)]?.marked) { d1 = false; break; }
  if (d1) for (let i = 0; i < size; i++) win[at(i, i)] = true;
  let d2 = true;
  for (let i = 0; i < size; i++) if (!cells[at(i, size - 1 - i)]?.marked) { d2 = false; break; }
  if (d2) for (let i = 0; i < size; i++) win[at(i, size - 1 - i)] = true;
  return win;
}

/** 返回所有已完成连线的格子下标（每条线一个数组，用于绘制连线动画） */
export function getWinningLines(cells: BingoCell[], size: number): number[][] {
  const lines: number[][] = [];
  const at = (r: number, c: number) => r * size + c;
  for (let r = 0; r < size; r++) {
    const idx: number[] = [];
    for (let c = 0; c < size; c++) idx.push(at(r, c));
    if (idx.every((i) => cells[i]?.marked)) lines.push(idx);
  }
  for (let c = 0; c < size; c++) {
    const idx: number[] = [];
    for (let r = 0; r < size; r++) idx.push(at(r, c));
    if (idx.every((i) => cells[i]?.marked)) lines.push(idx);
  }
  const d1: number[] = [];
  for (let i = 0; i < size; i++) d1.push(at(i, i));
  if (d1.every((i) => cells[i]?.marked)) lines.push(d1);
  const d2: number[] = [];
  for (let i = 0; i < size; i++) d2.push(at(i, size - 1 - i));
  if (d2.every((i) => cells[i]?.marked)) lines.push(d2);
  return lines;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** 随机生成一版棋盘（题库 ≥ 格数时不重复抽取；不足时随机重复补足） */
export function generateBoard(pool: BingoPoolItem[], size: number): BingoCell[] {
  const total = size * size;
  if (pool.length === 0) throw new Error("题库为空");
  let picked: BingoPoolItem[];
  if (pool.length >= total) {
    picked = shuffle(pool).slice(0, total);
  } else {
    picked = shuffle(pool);
    while (picked.length < total) picked = picked.concat(shuffle(pool));
    picked = shuffle(picked.slice(0, total));
  }
  return picked.map((it) => ({ text: it.name, img: it.img, marked: false, markedBy: null }));
}

/** 生成 6 位房间号（去掉易混淆字符 0/O/1/I/L） */
export function generateRoomCode(): string {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}
