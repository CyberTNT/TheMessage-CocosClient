import { TriggerSkill } from "../../../Components/Skill/Skill";
import { Character } from "../../../Components/Chatacter/Character";
import { skill_qiang_ling_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, ProcessEvent, NetworkEventToS, GameEvent } from "../../../Event/type";
import { WaitingType } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { GameLog } from "../../../Components/GameLog/GameLog";
import { Player } from "../../../Components/Player/Player";
import { CardType } from "../../Card/type";
import { GameManager } from "../../../Manager/GameManager";

export class QiangLing extends TriggerSkill {
  constructor(character: Character) {
    super({
      name: "强令",
      character,
      description:
        "你传出情报后，或你决定接收情报后，可以宣言至多两个卡牌名称。本回合中，所有角色均不能使用被宣言的卡牌。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_QIANG_LING_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_WAIT_FOR_QIANG_LING_TOC,
      (data) => {
        ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
          playerId: data.playerId,
          second: data.waitingSecond,
          type: WaitingType.USE_SKILL,
          seq: data.seq,
        });
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_QIANG_LING_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_WAIT_FOR_QIANG_LING_TOC);
  }

  onTrigger(gui: GameManager, params): void {
    const tooltip = gui.tooltip;
    const cardList = [
      gui.data.createCardByType(CardType.CHENG_QING),
      gui.data.createCardByType(CardType.PO_YI),
      gui.data.createCardByType(CardType.JIE_HUO),
      gui.data.createCardByType(CardType.DIAO_BAO),
      gui.data.createCardByType(CardType.WU_DAO),
    ];
    tooltip.setText(`是否使用【强令】？`);
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          const showCardsWindow = gui.showCardsWindow;
          showCardsWindow.show({
            title: "请选择至多两个卡牌类型",
            limit: 2,
            cardList,
            buttons: [
              {
                text: "确定",
                onclick: () => {
                  NetworkEventCenter.emit(NetworkEventToS.SKILL_QIANG_LING_TOS, {
                    enable: true,
                    types: showCardsWindow.selectedCards.list.map((card) => card.type),
                    seq: gui.seq,
                  });
                  showCardsWindow.hide();
                },
                enabled: () => showCardsWindow.selectedCards.list.length > 0,
              },
            ],
          });
        },
      },
      {
        text: "取消",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_QIANG_LING_TOS, {
            enable: false,
            seq: gui.seq,
          });
        },
      },
    ]);
  }

  onEffect(gameData: GameData, { playerId, types }: skill_qiang_ling_toc) {
    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, this);
    const player = gameData.playerList[playerId];
    const gameLog = gameData.gameLog;
    const cards = types.map((type) => gameData.createCardByType(<number>type));

    gameData.cardBanned = true;
    gameData.bannedCardTypes = [...gameData.bannedCardTypes, ...(<number[]>types)];
    GameEventCenter.once(GameEvent.GAME_TURN_CHANGE, () => {
      gameData.cardBanned = false;
      gameData.bannedCardTypes = [];
    });

    let str = `${gameLog.formatPlayer(player)}使用技能【强令】，宣言`;
    for (let card of cards) {
      str += gameLog.formatCard(card);
    }
    gameLog.addData(new GameLog(str));

    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, this);
  }
}
