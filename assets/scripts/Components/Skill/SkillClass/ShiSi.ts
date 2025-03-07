import { PassiveSkill } from "../../../Components/Skill/Skill";
import { Character } from "../../../Components/Chatacter/Character";
import { skill_shi_si_toc } from "../../../../protobuf/proto";
import { NetworkEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC } from "../../../Event/type";
import { GameData } from "../../../Manager/GameData";
import { GameLog } from "../../../Components/GameLog/GameLog";
import { Player } from "../../../Components/Player/Player";

export class ShiSi extends PassiveSkill {
  constructor(character: Character) {
    super({
      name: "视死",
      character,
      description: "你接收黑色情报后，摸两张牌。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_SHI_SI_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_SHI_SI_TOC);
  }

  onEffect(gameData: GameData, { playerId }: skill_shi_si_toc) {
    const player = gameData.playerList[playerId];
    const gameLog = gameData.gameLog;

    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}使用技能【视死】`));
  }
}
