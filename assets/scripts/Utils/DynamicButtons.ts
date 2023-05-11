import { _decorator, Component, NodePool, instantiate, resources, Prefab, Label, Button, Node } from "cc";
const { ccclass, property } = _decorator;

export interface ButtonConfig {
  text: string;
  onclick: () => void;
  enabled?: (() => boolean) | boolean;
}

@ccclass("DynamicButtons")
export default class DynamicButtons extends Component {
  private buttonPrefab: Prefab;
  private buttonPool = new NodePool();
  private buttonEnabled: { [index: number]: () => boolean };

  onLoad() {
    if (!this.buttonPrefab) {
      this.loadPrefab();
    }
  }

  update(deltaTime: number) {
    this.refreshButtonState();
  }

  loadPrefab() {
    return new Promise((resolve, reject) => {
      resources.load("prefab/DefaultButton", Prefab, (err, prefab) => {
        if (!err && prefab) {
          prefab.addRef();
          this.buttonPrefab = prefab;
          resolve(prefab);
        } else {
          reject(err);
        }
      });
    });
  }

  getButton(index: number) {
    return this.node.children[index];
  }

  getEnabled(index: number) {
    return this.buttonEnabled[index];
  }

  setEnabled(index: number, handler: () => boolean) {
    this.buttonEnabled[index] = handler;
  }

  removeEnabled(index: number) {
    delete this.buttonEnabled[index];
  }

  async setButtons(buttons: ButtonConfig[]) {
    if (!this.buttonPrefab) {
      await this.loadPrefab();
    }
    this.buttonEnabled = [];
    this.node.removeAllChildren();
    const l = buttons.length - this.node.children.length;
    if (l >= 0) {
      for (let i = 0; i < l; i++) {
        let button = this.buttonPool.get();
        if (!button) {
          button = instantiate(this.buttonPrefab);
        }
        this.node.addChild(button);
      }
    } else {
      for (let i = buttons.length; i < this.node.children.length; i++) {
        this.buttonPool.put(this.node.children[i]);
      }
    }
    for (let i = 0; i < buttons.length; i++) {
      const button = this.node.children[i];
      const config = buttons[i];
      button.getChildByName("Label").getComponent(Label).string = config.text;
      button.off(Node.EventType.TOUCH_END);
      button.on(Node.EventType.TOUCH_END, config.onclick, button);
      if (config.enabled != null) {
        if (config.enabled instanceof Function) {
          button.getComponent(Button).interactable = config.enabled();
          this.buttonEnabled[i] = config.enabled;
        } else {
          button.getComponent(Button).interactable = <boolean>buttons[i].enabled;
        }
      }
    }
    return this.node.children;
  }

  refreshButtonState() {
    for (let i in this.buttonEnabled) {
      const button = this.node.children[i];
      button.getComponent(Button).interactable = this.buttonEnabled[i]();
    }
  }
}
