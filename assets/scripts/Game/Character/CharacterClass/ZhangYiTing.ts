import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { QiangLing } from "../../Skill/SkillClass/QiangLing";

export class ZhangYiTing extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 5,
      name: "张一挺",
      sprite: "images/characters/ZhangYiTing",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      skills: [new QiangLing()],
      gameObject: gameObject,
    });
  }
}
