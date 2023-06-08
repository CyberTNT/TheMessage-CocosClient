import { _decorator, Component, Prefab, instantiate } from "cc";
import { Skill } from "../../../Game/Skill/Skill";
import { SkillButton } from "../../../Game/Skill/SkillButton";
import { GameData } from "./GameData";
const { ccclass, property } = _decorator;

@ccclass("SkillButtons")
export class SkillButtons extends Component {
  @property(Prefab)
  skillButtonPrefab: Prefab | null = null;

  public list: SkillButton[] = [];

  init(gameData: GameData, skills: Skill[]) {
    for (let skill of skills) {
      const button = instantiate(this.skillButtonPrefab);
      const skillButton = button.getComponent(SkillButton);
      skillButton.init(gameData, skill);
      this.list.push(skillButton);
      this.node.addChild(button);
    }
  }
}