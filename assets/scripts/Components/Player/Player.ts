import { Character } from "../Chatacter/Character";
import { Identity } from "../Identity/Identity";
import { PlayerObject } from "./PlayerObject";
import { PlayerOption, PlayerStatus } from "./type";
import { DataBasic } from "../../DataBasic";
import { CardStatus, CardColor } from "../Card/type";
import { Card } from "../Card/Card";
import { Agent } from "../Identity/IdentityClass/Agent";
import { copyCard } from "../Card";
import { CharacterObject } from "../Chatacter/CharacterObject";
import { Lurker } from "../Identity/IdentityClass/Lurker";
import { MysteriousPerson } from "../Identity/IdentityClass/MysteriousPerson";
import { IdentityType } from "../Identity/type";

export class Player extends DataBasic<PlayerObject> {
  private _id: number;
  private _name: string;
  private _character: Character;
  private _identityList: Identity[] = [new Agent(), new Lurker(), new MysteriousPerson()];
  private _seatNumber: number;
  private _messages: Card[] = [];
  private _handCardCount: number = 0;
  private _status: PlayerStatus = PlayerStatus.ALIVE;

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get character() {
    return this._character;
  }
  set character(character: Character) {
    if (!character || character === this._character) return;
    this._character = character;
    if (this.gameObject) {
      this.character.gameObject = this.gameObject.node
        .getChildByPath("Border/CharacterPanting")
        .getComponent(CharacterObject);
    }
  }

  get identityList() {
    return this._identityList;
  }

  get seatNumber() {
    return this._seatNumber;
  }
  set seatNumber(number) {
    if (number == null || number === this._seatNumber) return;
    this._seatNumber = number;
    this.gameObject?.setSeat();
  }

  get handCardCount() {
    return this._handCardCount;
  }

  get messageCounts() {
    const data: any = { total: this._messages.length };
    data[CardColor.BLACK] = 0;
    data[CardColor.RED] = 0;
    data[CardColor.BLUE] = 0;
    for (let message of this._messages) {
      for (let color of message.color) {
        ++data[color];
      }
    }
    return data;
  }

  get status() {
    return this._status;
  }

  set status(status: PlayerStatus) {
    if (status == null || status === this._status || this._status === PlayerStatus.DEAD) return;
    this._status = status;
    this.gameObject?.refreshStatus();
  }

  get isAlive() {
    return this._status !== PlayerStatus.DEAD;
  }

  constructor(option: PlayerOption) {
    super();
    this._id = option.id;
    this._name = option.name;
    this.character = option.character;
    if (option.identity != null) {
    }
    if (option.gameObject) {
      this.gameObject = option.gameObject;
    }
  }

  //抽牌
  addHandCard(num: number) {
    this._handCardCount += num;
    this.gameObject?.refreshHandCardCount();
  }

  //弃牌
  removeHandCard(num: number) {
    this._handCardCount -= num;
    this.gameObject?.refreshHandCardCount();
  }

  //角色翻面
  flipCharacter() {
    this._character.flip();
  }

  //情报置入情报区
  addMessage(message: Card);
  addMessage(messages: Card[]);
  addMessage(messages: Card | Card[]) {
    if (!(messages instanceof Array)) {
      messages = [messages];
    }
    messages.forEach((message) => {
      if (message.status !== CardStatus.FACE_UP) message.status = CardStatus.FACE_UP;
    });

    this._messages = [...this._messages, ...messages];
    if (this.messageCounts[CardColor.BLACK] >= 3) {
      this.status = PlayerStatus.DYING;
    }
    this.gameObject?.refreshMessageCount();
  }

  //从情报区移除情报
  removeMessage(messageId: number): Card;
  removeMessage(messageIds: number[]): Card[];
  removeMessage(messageIds: number | number[]): Card | Card[] {
    if (typeof messageIds === "number") {
      let message = null;
      for (let i = 0; i < this._messages.length; i++) {
        if (messageIds === this._messages[i].id) {
          message = this._messages.splice(i, 1)[0];
          break;
        }
      }
      this.gameObject?.refreshMessageCount();
      if (this.messageCounts[CardColor.BLACK] < 3) {
        this.status = PlayerStatus.ALIVE;
      }
      return message;
    } else {
      const arr = [];
      for (let messageId of messageIds) {
        for (let i = 0; i < this._messages.length; i++) {
          if (messageId === this._messages[i].id) {
            arr.push(this._messages.splice(i, 1)[0]);
            break;
          }
        }
      }
      this.gameObject?.refreshMessageCount();
      if (this.messageCounts[CardColor.BLACK] < 3) {
        this.status = PlayerStatus.ALIVE;
      }
      return arr;
    }
  }

  //移除所有情报
  removeAllMessage() {
    const arr = this._messages;
    this._messages = [];
    this.gameObject?.refreshMessageCount();
    return arr;
  }

  //确认玩家是某个身份
  confirmIdentity(identityType: IdentityType);
  confirmIdentity(identity: Identity);
  confirmIdentity(identity: Identity | IdentityType) {
    if (identity instanceof Identity) {
      this._identityList = [identity];
    } else {
      for (let item of this._identityList) {
        if (item.type === identity) {
          this._identityList = [item];
        }
      }
    }

    this.gameObject?.refreshIdentityList();
  }

  //排除玩家是某个身份
  ruleOutIdentity(identityType: IdentityType);
  ruleOutIdentity(identity: Identity);
  ruleOutIdentity(identity: Identity | IdentityType) {
    for (let i = 0; i < this._identityList.length; i++) {
      if (
        identity instanceof Identity
          ? this._identityList[i].type === identity.type
          : this._identityList[i].type === identity
      ) {
        this._identityList.splice(i, 1);
        break;
      }
    }
    this.gameObject?.refreshIdentityList();
  }

  setIdentityList(list: Identity[]) {
    this._identityList = list;
    this.gameObject?.refreshIdentityList();
  }

  getMessagesCopy(): Card[] {
    const arr = [];
    for (let message of this._messages) {
      arr.push(copyCard(message));
    }
    return arr;
  }
}
