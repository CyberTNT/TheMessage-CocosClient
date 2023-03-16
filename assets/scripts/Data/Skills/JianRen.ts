import { GameEvent } from "../../Event/type";
import { TriggeringSkill } from "./Skill";
import { SkillOption } from "./type";
import { Player } from "../Player/Player";

export class JianRen extends TriggeringSkill {
  constructor(option: SkillOption) {
    super({
      name: "坚韧",
      character: option.character,
      description:
        "你接收黑色情报后，可以展示牌堆顶的一张牌，若是黑色牌，则将展示的牌加入你的手牌，并从一名角色的情报区弃置一张黑色情报。",
      triggerEvent: [GameEvent.ACCEPT_BLACK_MESSAGE],
    });
  }

  onTrigger(player: Player): void {
    if (player.character === this.character) {
    }
  }

  onUse() {}
}
