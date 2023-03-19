import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../../Data/Skills/Skill";
import { CharacterObject } from "../CharacterObject";

export class HanMei extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 14,
      name: "韩梅",
      sprite: "images/characters/HanMei",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.FAMALE,
      skills: [] as Skill[],
      gameObject: gameObject,
    });
  }
}