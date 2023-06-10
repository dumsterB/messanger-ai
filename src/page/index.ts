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

      if (messengerContentElem) {
        if (messengerContentElem.classList.contains("messenger-content-show")) {
          // Скрываем элемент с анимацией
          messengerContentElem.classList.remove("messenger-content-show");
          messengerContentElem.classList.add("messenger-content-hide");

          setTimeout(() => {
            messengerContentElem.style.display = "none";
            messengerContentElem.classList.remove("messenger-content-hide");
          }, 300); // Задержка для анимации
        } else {
          // Показываем элемент с анимацией
          messengerContentElem.style.display = "block";
          messengerContentElem.classList.add("messenger-content-show");
          (window as any).setFocusOnMessageInput()
        }
      }
    });



    messengerContainer.appendChild(messengerButton);
    messengerContainer.appendChild(messengerContent(config));

    element.appendChild(messengerContainer);
  }
}
