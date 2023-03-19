import { Card } from "../Card";
import { CardDefaultOption, CardType } from "../type";
import EventTarget from "../../../Event/EventTarget";
import { NetworkEventToS } from "../../../Event/type";

export class DiaoBao extends Card {
  constructor(option: CardDefaultOption) {
    super({
      id: option.id,
      name: "调包",
      type: CardType.DIAO_BAO,
      sprite: "images/cards/DiaoBao",
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
      usage: option.usage,
      gameObject: option.gameObject,
    });
  }

  onPlay() {
    super.onPlay();
    EventTarget.emit(NetworkEventToS.USE_DIAO_BAO_TOS, { cardId: this.id });
  }
}