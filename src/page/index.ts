import { MessangerConfig } from "../types";
import { messengerContent } from "../component/messanger/index";
import "./index.css";
import button_img from "../assets/chat.svg";

const messengerButton = document.createElement("button");
(window as any).closeMessenger = () => {
  const messengerContentElem = document.getElementById("messenger-content");
  if (messengerContentElem) {
    messengerContentElem.classList.remove("messenger-content-show");
    messengerContentElem.classList.add("messenger-content-hide");
    messengerButton.classList.add("animate-bounce")
    setTimeout(()=>{
      messengerButton.classList.remove("animate-bounce")
    },1500)
    setTimeout(() => {
      messengerContentElem.style.display = "none";

      messengerContentElem.classList.remove("messenger-content-hide");
    }, 300); // Задержка для анимации
  }
};

class Messenger {
  private messengerContentElem: HTMLElement;
  private messengerButton: HTMLButtonElement;
  private params: MessangerConfig

  constructor(config: MessangerConfig) {
    this.initializeMessenger(config);
    this.params = config
    this.messengerContentElem = document.getElementById("messenger-content")!;
    this.messengerButton = document.querySelector(".messenger-button") as HTMLButtonElement;
    this.messengerButton.addEventListener("click", this.toggleMessengerContent.bind(this));
  }

  private toggleMessengerContent() {
    if (this.messengerContentElem.classList.contains("messenger-content-show")) {
      this.hideMessengerContent();
    } else {
      this.showMessengerContent();
    }
  }

  private hideMessengerContent() {
    this.messengerContentElem.classList.remove("messenger-content-show");
    this.messengerContentElem.classList.add("messenger-content-hide");
    this.messengerButton.classList.add("animate-bounce");
    setTimeout(() => {
      this.messengerButton.classList.remove("animate-bounce");
    }, 1500);
    setTimeout(() => {
      this.messengerContentElem.style.display = "none";
      this.messengerContentElem.classList.remove("messenger-content-hide");
    }, 300); // Задержка для анимации
  }

  private showMessengerContent() {
    this.messengerContentElem.style.display = "block";
    this.messengerContentElem.classList.add("messenger-content-show");
    (window as any).setFocusOnMessageInput();
  }

  private initializeMessenger(config: MessangerConfig) {
    const element = document.getElementById(config.holder || "app");
    if (!element) {
      console.error(`Element with ID ${config.holder || "id of element"} not found.`);
      return;
    }

    const messengerContainer = document.createElement("div");
    messengerContainer.classList.add("messenger-container");
    this.messengerButton = document.createElement("button");
    this.messengerButton.classList.add("messenger-button");
    this.messengerButton.innerHTML = `<img class="chat-img" src="${button_img}"></img>`;
    this.messengerButton.style.background = config?.color ? config.color : ''

    messengerContainer.appendChild(this.messengerButton);
    messengerContainer.appendChild(messengerContent(config));

    element.appendChild(messengerContainer);
  }
}

export default Messenger;
