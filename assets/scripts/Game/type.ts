export enum GamePhase {
  DRAW_PHASE = 0, // 摸牌阶段
  MAIN_PHASE = 1, // 出牌阶段
  SEND_PHASE_START = 2, // 情报传递阶段开始时
  SEND_PHASE = 3, // 传递阶段
  FIGHT_PHASE = 4, // 争夺阶段
  RECEIVE_PHASE = 5, // 接收阶段
}

export enum IdentifyType {
  GREEN = 0, // 神秘人
  RED = 1, // 潜伏战线
  BLUE = 2, // 特工机关
  HAS_NO_IDENTITY = 3, // 失去身份
}

export enum SecretTaskType {
  KILLER = 0, // 镇压者 你的回合中，一名红色和蓝色情报合计不少于2张的人死亡
  STEALER = 1, // 簒夺者 你的回合中，有人宣胜，则你代替他胜利
  COLLECTOR = 2, // 双重间谍 你获得3张红色情报或者3张蓝色情报
  MUTATOR = 3, // 诱变者 当一名角色收集了三张红色情报或三张蓝色情报后，若其没有宣告胜利，则你胜利
  PIONEER = 4, // 先行者 你死亡时，已收集了至少一张红色情报或蓝色情报
}