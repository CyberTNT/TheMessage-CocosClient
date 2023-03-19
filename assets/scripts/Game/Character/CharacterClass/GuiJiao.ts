import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../../Data/Skills/Skill";
import { CharacterObject } from "../CharacterObject";

export class GuiJiao extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 17,
      name: "鬼脚",
      sprite: "images/characters/GuiJiao",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      skills: [] as Skill[],
      gameObject: gameObject,
    });
  }
}