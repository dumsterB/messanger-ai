import SocialMedias from "../socials/index";
import Tags from '../tags/index'
import { MessangerConfig } from "../../types/index.ts";
import postGPT from "../../services/postGPT";
import "./index.css";
import avatar from "../../assets/avatar.jpg";
import { send } from "../../utils/icons";

export function messengerContent(params: MessangerConfig): HTMLElement {
  const messengerContent: HTMLElement = document.createElement("div");
  messengerContent.id = "messenger-content";
  messengerContent.classList.add("messenger-content");

  messengerContent.innerHTML = `
    <div class="messenger-header bg-gray-500">
      <div class="w-full h-12 flex justify-between">
        <div class="flex items-center">
          <img class="w-12 h-12 rounded-full" src="${params.picture || avatar}" alt="Rounded avatar">
          <span class="messenger-title text-white font-bold ml-2">${params.name || "Admin"}</span>
        </div>
        <button class="messenger-close text-white" onclick="closeMessenger()">&times;</button>
      </div>
    </div>
    <div class="messenger-body">
      <div class="messanger-content">
        ${SocialMedias(params || {})}
        <div id="message-content" class="message-content mt-1 p-2"></div>
      </div>
      <div id="input-container" class="input-container flex">
        <input id="message-input" class="mt-1 border border-gray-300 rounded message-input rounded-lg" placeholder="Type your message here">
        <button id="send-button" class="send-button text-white button"> <span class="send-button-icon">${send}</span> </button>
      </div>
    </div>
  `;

  const sendButton: HTMLButtonElement | null = messengerContent.querySelector("#send-button");
  const messageInput: HTMLInputElement | null = messengerContent.querySelector("#message-input");
  const messageContent: HTMLElement | null = messengerContent.querySelector("#message-content");
  const messengerHeader: HTMLDivElement | null = messengerContent.querySelector('.messenger-header')

  if(messengerHeader) messengerHeader.style.background = params.header_background  || ''
  if(sendButton) sendButton.style.background = params.color || '';

  (window as any).setFocusOnMessageInput = function () {
    if (messageInput) {
      messageInput.focus();
    }
  };

  function sendMessage() {
    const message: string = messageInput?.value?.trim() || "";
    if (message !== "") {
      displayUserMessage(message);
      messageInput!.value = "";
      sendMessageToChatGPT(message);
    }
  }

  function displayUserMessage(message: string) {
    const wrapper: HTMLDivElement = document.createElement("div");
    wrapper.style.display = "flex";
    const divider: HTMLDivElement = document.createElement("div");
    divider.style.flex = "1 1";
    const userMessage: HTMLDivElement = document.createElement("div");
    userMessage.classList.add("message", "user-message");
    const text: HTMLParagraphElement = document.createElement("p");
    text.textContent = message;
    userMessage.appendChild(text);
    wrapper.appendChild(divider);
    wrapper.appendChild(userMessage);
    messageContent?.appendChild(wrapper);
    scrollToBottom();
  }

  function displayChatGPTResponse(response: string) {
    const wrapper: HTMLDivElement = document.createElement("div");
    wrapper.style.display = "flex";
    const divider: HTMLDivElement = document.createElement("div");
    divider.style.flex = "1 1";
    const chatGPTResponse: HTMLDivElement = document.createElement("div");
    chatGPTResponse.classList.add("message", "chatgpt-response");
    chatGPTResponse.textContent = response;
    wrapper.appendChild(chatGPTResponse);
    wrapper.appendChild(divider);
    messageContent?.appendChild(wrapper);
    const tagsComponent: HTMLElement = document.createElement("div");
    tagsComponent.innerHTML = Tags();
    messageContent?.appendChild(tagsComponent)
    scrollToBottom();
  }

  function scrollToBottom() {
    if (messageContent?.scrollTop) {
      messageContent.scrollTop = messageContent.scrollHeight;
    }
  }

  function sendMessageToChatGPT(message: string) {
    postGPT({ message: message, token: params.token }).then((res: any) => {
      displayChatGPTResponse(res);
    });
  }

  if (messageInput) {
    messageInput.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.keyCode === 13) {
        event.preventDefault(); // Prevent the default behavior of the Enter key
        sendMessage();
      }
    });
  }

  if (sendButton) {
    sendButton.addEventListener("click", sendMessage);
  }

  return messengerContent;
}
