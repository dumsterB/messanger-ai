import './index.css';
import avatar from '../../assets/avatar.jpg';
import { MessangerConfig } from '../../types/index.ts';
import { io, Socket } from 'socket.io-client';
import {send} from '../../utils/icons'
import SocialMedias from "../socials/index";

export function messengerContent(params: MessangerConfig): HTMLElement {
      console.log(params)
    const messengerContent: HTMLElement = document.createElement('div');
    messengerContent.id = 'messenger-content';
    messengerContent.classList.add('messenger-content');

    messengerContent.innerHTML = `
    <div class="messenger-header bg-gray-500">
      <div class="w-full h-12 flex justify-between">
        <div class="flex items-center">
          <img class="w-12 h-12 rounded-full" src="${avatar}" alt="Rounded avatar">
          <span class="messenger-title text-white font-bold ml-2">${params.name || 'Admin'}</span>
        </div>
        <button class="messenger-close text-white" onclick="closeMessenger()">&times;</button>
      </div>
    </div>
    <div class="messenger-body">
      <div class="messanger-content">
      ${SocialMedias(params?.socials)}
      <div id="message-content" class="message-content mt-2 p-3"></div>
     </div>
      <div id="input-container" class="input-container flex">
        <input  id="message-input" class="mt-1 border border-gray-300 rounded message-input rounded-lg" placeholder="Type your message here">
        <button  id="send-button" class="mt-1 px-4 py-2 ml-2 bg-blue-500 text-white rounded">${send}</button>
      </div>
    </div>
  `;

    const sendButton: HTMLButtonElement | null = messengerContent.querySelector('#send-button');
    const messageInput: HTMLInputElement | null = messengerContent.querySelector('#message-input');
    const messageContent: HTMLElement | null = messengerContent.querySelector('#message-content');

    messageInput?.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event?.keyCode === 13) {
            event?.preventDefault(); // Prevent the default behavior of the Enter key
            const message: string = messageInput.value?.trim() || '';
            if (message !== '') {
                displayUserMessage(message);
                if (messageInput.value) {
                    messageInput.value = '';
                }
                sendMessageToChatGPT(message);
            }
        }
    });

    // ...

    messageInput?.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event?.keyCode === 13) {
            event?.preventDefault(); // Prevent the default behavior of the Enter key
            const message: string = messageInput?.value?.trim() || '';
            if (message !== '') {
                displayUserMessage(message);
                if (messageInput?.value) {
                    messageInput.value = '';
                }
                sendMessageToChatGPT(message);
            }
        }
    });

    sendButton?.addEventListener('click', () => {
        const message: string = messageInput?.value?.trim() || '';
        if (message !== '') {
            displayUserMessage(message);
            if (messageInput?.value) {
                messageInput.value = '';
            }
            sendMessageToChatGPT(message);
        }
    });

// ...


    function displayUserMessage(message: string) {
        const wrapper:HTMLDivElement = document.createElement('div')
        const divider:HTMLDivElement = document.createElement('div')
        const userMessage: HTMLDivElement = document.createElement('div');
        wrapper.style.display = 'flex'
        divider.style.flex = '1 1'
        const text:HTMLParagraphElement = document.createElement('p')
        userMessage.classList.add('message', 'user-message');
        text.textContent = message;
        userMessage.appendChild(text)
        wrapper?.appendChild(divider)
        wrapper?.appendChild(userMessage)
        messageContent?.appendChild(wrapper);
        scrollToBottom();
    }

    function displayChatGPTResponse(response: string) {
        const wrapper:HTMLDivElement = document.createElement('div')
        const divider:HTMLDivElement = document.createElement('div')
        const chatGPTResponse: HTMLDivElement = document.createElement('div');
        wrapper.style.display = 'flex'
        divider.style.flex = '1 1'
        chatGPTResponse.classList.add('message', 'chatgpt-response');
        chatGPTResponse.textContent = response;
        wrapper?.appendChild(chatGPTResponse)
        wrapper?.appendChild(divider)
        messageContent?.appendChild(wrapper);
        scrollToBottom();
    }

    function scrollToBottom() {
        if (messageContent?.scrollTop) {
            messageContent.scrollTop = messageContent.scrollHeight;
        }
    }
    //
    // async function sendMessageToChatGPT(message: string) {
    //     const socket = Socket();
    //     console.log(socket)
    //     const response = await fetch('https://api.openai.com/v1/chat/completions', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${params.token}`
    //         },
    //         body: JSON.stringify({
    //             messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: message }],
    //             model: 'gpt-3.5-turbo' // Замените на нужный идентификатор модели, например 'gpt-3.5-turbo'
    //         })
    //     });
    //
    //     const { choices } = await response.json();
    //     const chatGPTResponse: string = choices[0].message.content;
    //     displayChatGPTResponse(chatGPTResponse);
    // }
    async function sendMessageToChatGPT(message: string) {
        const socket: Socket = io('http://localhost:3000'); // Подключение к серверу socket.io

        // Отправка сообщения на сервер
        socket.emit('userMessage', { message });

        // Ожидание ответа от сервера
        socket.on('chatGPTResponse', (response: string) => {
            console.log(response)
            displayChatGPTResponse(response);
        });
    }

    return messengerContent;
}
