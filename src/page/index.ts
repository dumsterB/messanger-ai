import { MessangerConfig } from "../types";
import { messengerContent } from "../component/messanger/index";
import "./index.css";
import button_img from "../assets/chat.svg";

const messengerButton = document.createElement("button");
(window as any).closeMessenger = () => {
  const messengerContentElem = document.getElementById("messenger-content");
  if (messengerContentElem) {
    messengerButton.style.transition = "left 0.5s";
    messengerContentElem.style.display = "none";
    messengerButton.classList.add("animate-bounce")
    setTimeout(()=>{
      messengerButton.classList.remove("animate-bounce")
    },2500)
  }
};

export default class Messenger {
  constructor(config: MessangerConfig) {
    this.initializeMessenger(config);
  }

  initializeMessenger(config: MessangerConfig) {
    const element = document.getElementById(config.holder || "app");
    if (!element) {
      console.error(
        `Element with ID ${config.holder || "id of element"} not found.`
      );
      return;
    }

    const messengerContainer = document.createElement("div");
    messengerContainer.classList.add("messenger-container");
    messengerButton.classList.add("messenger-button");

    messengerButton.innerHTML = `<img class="chat-img"  src="${button_img}"></img>`;

    messengerButton.addEventListener("click", () => {
      const messengerContentElem = document.getElementById("messenger-content");
      if (
        messengerContentElem &&
        messengerContentElem.style.display === "block"
      ) {
        messengerContentElem.style.display = "none";
      } else if (
        messengerContentElem &&
        messengerContentElem.style.display === "none"
      ) {
        messengerButton.style.left = "block";
        messengerContentElem.style.display = "block";
      }
    });

    messengerContainer.appendChild(messengerButton);
    messengerContainer.appendChild(messengerContent(config));

    element.appendChild(messengerContainer);
  }
}
