import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../../Data/Skills/Skill";
import { CharacterObject } from "../CharacterObject";

export class BaiCangLang extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 6,
      name: "白沧浪",
      sprite: "images/characters/BaiCangLang",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      skills: [] as Skill[],
      gameObject: gameObject,
    });
  }
}