import { IdentityType } from "../Identity/type";
import { CardObject } from "./CardObject";

export const enum CardStatus {
  FACE_DOWN = 0,
  FACE_UP = 1,
}

export const enum CardType {
  UNKNOWN = -1, //未知卡牌
  CHENG_QING = 0, // 澄清
  SHI_TAN = 1, // 试探
  WEI_BI = 2, // 威逼
  LI_YOU = 3, // 利诱
  PING_HENG = 4, // 平衡
  PO_YI = 5, // 破译
  JIE_HUO = 6, // 截获
  DIAO_BAO = 7, // 调包
  WU_DAO = 8, // 误导
  FENG_YUN_BIAN_HUAN = 9, // 风云变幻
  MI_LING = 10, // 密令
}

export const enum CardColor {
  BLACK = 0,
  RED = 1,
  BLUE = 2,
}

export const enum CardDirection {
  UP = 0,
  LEFT = 1,
  RIGHT = 2,
}

export const enum CardUsableStatus {
  UNUSEABLE = 0,
  USABLE = 1,
  BANNED = 2,
}

export interface CardOption {
  id?: number;
  name: string;
  type: CardType;
  status?: CardStatus;
  color?: CardColor[];
  direction?: CardDirection;
  lockable?: boolean;
  gameObject?: CardObject;
}

export interface CardDefaultOption {
  id?: number;
  direction?: CardDirection;
  color?: CardColor[];
  lockable?: boolean;
  status?: CardStatus;
  gameObject?: CardObject;
}

export interface ShiTanOption {
  id?: number;
  direction?: CardDirection;
  drawCardColor?: IdentityType[];
  color?: CardColor[];
  lockable?: boolean;
  status?: CardStatus;
  gameObject?: CardObject;
}

export interface MiLingOption {
  id?: number;
  direction?: CardDirection;
  secretColor?: CardColor[];
  color?: CardColor[];
  lockable?: boolean;
  status?: CardStatus;
  gameObject?: CardObject;
}

export interface CardOnEffectParams {
  [index: string]: any;
}
