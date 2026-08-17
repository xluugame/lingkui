/**
 * ============================================================
 *  打手（陪玩）数据契约 —— 前台展示 + 后续后台录入共用
 * ============================================================
 * 说明：
 * - 前后端通过 @contracts/players 共享类型，保持一致
 * - 当前为「先填外部链接」阶段：photo / photos / audioUrl 都是 URL 字符串
 * - 后续接入管理后台上传后，这些字段仍是 URL，无需改结构
 */

/** 游戏标签（如：三角洲行动、无畏契约、英雄联盟…） */
export interface PlayerGame {
  /** 游戏名 */
  name: string;
  /** 段位/巅峰分描述，如「巅峰统帅」「神话三」 */
  rank: string;
}

/** 打手资料 */
export interface Player {
  /** 唯一 ID */
  id: string;
  /** 昵称 */
  name: string;
  /** 性别：male / female */
  gender: "male" | "female";
  /** 年龄 */
  age: number;
  /** 头像 URL */
  photo: string;
  /** 照片墙 URL 列表（详情页） */
  photos: string[];
  /**
   * 介绍视频 URL（可选，MP4）
   * 有视频时显示在照片墙第一个位置（静音自动循环预览，点击全屏有声播放）
   * 后续由管理后台上传文件；没有则省略，照片墙正常只显示照片
   */
  videoUrl?: string;
  /** 性格标签，如：温柔耐心、技术带飞 */
  tags: string[];
  /** 个人简介 */
  bio: string;
  /** 主玩游戏 + 段位 */
  games: PlayerGame[];
  /** 擅长英雄/位置（自由文本） */
  specialty: string;
  /** 所在城市 */
  city: string;
  /** 试音音频 URL */
  audioUrl: string;
  /** 是否推荐（首页轮播/列表置顶） */
  featured: boolean;
  /** 上架状态：前台只展示 online */
  status: "online" | "offline";
}

/** 列表筛选条件 */
export interface PlayerFilter {
  /** 游戏名（空 = 全部） */
  game?: string;
  /** 性别（空 = 全部） */
  gender?: "male" | "female" | "";
  /** 城市（空 = 全部） */
  city?: string;
  /** 搜索关键词（昵称/游戏名） */
  keyword?: string;
}
