import SocialMedias from "../socials/index";
import { updatePrompts } from "../tags/index";
import Tags from "../tags/index";
import Loader from '../loader/index'
import { MessangerConfig, Prompt } from "../../types/index.ts";
import {
  postMessageChatGPT,
  sendMessageToGetPrompts,
} from "../../services/postGPT";
import "./index.css";
import avatar from "../../assets/avatarImage.jpeg";
import { send } from "../../utils/icons";

export function messengerContent(params: MessangerConfig): HTMLElement {
  const messengerContent: HTMLElement = document.createElement("div");
  messengerContent.id = "messenger-content";
  messengerContent.classList.add("messenger-content");

  messengerContent.innerHTML = `
    <div class="messenger-header bg-gray-500">
      <div class="w-full h-12 flex justify-between">
        <div class="flex items-center">
          <img class="w-11 h-11 rounded-full" src="${
            params.picture || avatar
          }" alt="Rounded avatar">
          <span class="messenger-title text-white font-bold ml-2">${
            params.name || "Admin"
          }</span>
        </div>
        <button class="messenger-close" onclick="closeMessenger()">&times;</button>
      </div>
    </div>
    <div class="messenger-body">
      <div class="messanger-content">
        ${SocialMedias(params || {})}
        <div id="message-content" class="message-content chats mt-1 p-2"></div>
      </div>
      <div id="input-container" class="input-container">
        <textarea id="message-input" class="mt-1 border border-gray-200 rounded message-input rounded-lg break-all	" placeholder="Type your message here"></textarea>
        <button id="send-button" class="send-button text-white button"> <span class="send-button-icon">${send}</span></button>
      </div>
    </div>
  `;

  const sendButton: HTMLButtonElement | null =
    messengerContent.querySelector("#send-button");
  const messageInput: HTMLInputElement | null =
    messengerContent.querySelector("#message-input");
  const messageContent: HTMLElement | null =
    messengerContent.querySelector("#message-content");
  const messengerHeader: HTMLDivElement | null =
    messengerContent.querySelector(".messenger-header");
  const messenger_body: HTMLDivElement | null =
    messengerContent.querySelector(".messenger-body");
  const tagsComponent: HTMLElement = document.createElement("div");
  const loaderComponents: HTMLDivElement = document.createElement('div')

  if (!SocialMedias(params)) {
    if (messageContent) messageContent.style.height = "380px";
    if (messenger_body) messenger_body.style.height = "470px";
  }

  if (messengerHeader)
    messengerHeader.style.background = params.header_background || "";
  if (sendButton) sendButton.style.background = params.color || "";

  (window as any).setFocusOnMessageInput = function () {
    if (messageInput) {
      if (messageInput === document.activeElement) {
        messageInput.blur();
      } else {
        messageInput.focus();
      }
    }
  };

  (window as any).setTag = function (event: any) {
    const buttonText = event.querySelector(".tagTextContent").textContent;
    sendMessage(buttonText);
  };

  async function sendMessage(value?: string) {
    if (sendButton) sendButton.disabled = true;
    if (messageInput) messageInput.disabled = false;
    loaderComponents.innerHTML = Loader(true);

    let message: string;
    if (!value) {
      message = messageInput?.value?.trim() || "";
    } else {
      message = value;
    }
    if (message !== "") {
      displayUserMessage(message);
      messageInput!.value = "";

      if (params.request) {
        try {
          await params.request(message).then(async () => {
            await sendMessageToGetPrompts({
              message: message,
              token: params.token,
            }).then((res) => {
              loaderComponents.innerHTML = Loader(false);
              updatePrompts(res);
            });
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        await sendMessageToChatGPT(message).then(async () => {
          let res: Prompt[] = await sendMessageToGetPrompts({
            message: message,
            token: params.token,
          });
          loaderComponents.innerHTML = Loader(false);
          clearTags();
          res = res.filter((element) => element.length > 0);
          updatePrompts(res);
          tagsComponent.classList.add("tag-wrapper");
          tagsComponent.innerHTML = Tags();
          messageContent?.appendChild(tagsComponent);
        });
      }
    }
    if (sendButton) sendButton.disabled = false;
    // if(messageInput) messageInput.disabled = false;
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
    messageContent?.appendChild(tagsComponent);
    messageContent?.appendChild(loaderComponents);

    scrollToBottom();
  }

  function scrollToBottom() {
    if (messageContent?.scrollTop) {
      messageContent.scrollTop = messageContent.scrollHeight;
    }
  }

  async function sendMessageToChatGPT(message: string) {
    try {
      await postMessageChatGPT({ message: message, token: params.token }).then(
        (res: any) => {
          displayChatGPTResponse(res);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  if (messageInput) {
    messageInput.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.keyCode === 13) {
        if (sendButton && !sendButton.disabled) {
          event.preventDefault(); // Prevent the default behavior of the Enter key
          sendMessage();
        }
      }
    });
  }

  if (sendButton) {
    sendButton.addEventListener("click", () => sendMessage());
  }

  function clearTags() {
    let tagWrappers = document.getElementsByClassName("tag-wrapper");
    while (tagWrappers.length > 0) {
      tagWrappers[0]?.parentNode?.removeChild(tagWrappers[0]);
    }
  }

  return messengerContent;
}
