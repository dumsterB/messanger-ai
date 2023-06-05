import './index.css';
import avatar from '../../assets/avatar.jpg';

export function messengerContent(params) {
    const messengerContent = document.createElement('div');
    messengerContent.id = 'messenger-content';
    messengerContent.classList.add('messenger-content');

    messengerContent.innerHTML = `
    <div class="messenger-header bg-gray-500 flex justify-between">
      <div class="w-full h-12 flex justify-between">
        <div class="flex items-center">
          <img class="w-12 h-12 rounded-full" src="${avatar}" alt="Rounded avatar">
          <span class="messenger-title text-white font-bold ml-2">${params.name || 'Admin'}</span>
        </div>
        <button class="messenger-close text-white" onclick="closeMessenger()">&times;</button>
      </div>
    </div>
    <div class="messenger-body p-4">
      <div id="message-content" class="message-content"></div>
      <div id="input-container" class="input-container flex">
               <input  id="message-input" class="mt-4 p-2 border border-gray-300 rounded message-input" placeholder="Type your message here">

         <button  id="send-button" class="mt-4 px-4 py-2 ml-2 bg-blue-500 text-white rounded">Send</button>
      </div>
    </div>
  `;

    const sendButton = messengerContent.querySelector('#send-button');
    const messageInput = messengerContent.querySelector('#message-input');
    const messageContent = messengerContent.querySelector('#message-content');

    messageInput.addEventListener('keydown', (event) => {
        if (event.keyCode === 13) {
            event.preventDefault(); // Prevent the default behavior of the Enter key
            const message = messageInput.value.trim();
            if (message !== '') {
                displayUserMessage(message);
                messageInput.value = '';
                sendMessageToChatGPT(message);
            }
        }
    });

    sendButton.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message !== '') {
            displayUserMessage(message);
            messageInput.value = '';
            sendMessageToChatGPT(message);
        }
    });

    function displayUserMessage(message) {
        const userMessage = document.createElement('div');
        userMessage.classList.add('message', 'user-message');
        userMessage.textContent = message;
        messageContent.appendChild(userMessage);
        scrollToBottom();
    }

    function displayChatGPTResponse(response) {
        const chatGPTResponse = document.createElement('div');
        chatGPTResponse.classList.add('message', 'chatgpt-response');
        chatGPTResponse.textContent = response;
        messageContent.appendChild(chatGPTResponse);
        scrollToBottom();
    }

    function scrollToBottom() {
        messageContent.scrollTop = messageContent.scrollHeight;
    }

    async function sendMessageToChatGPT(message) {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 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`
            },
            body: JSON.stringify({
                messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: message }],
                model: 'gpt-3.5-turbo' // Замените на нужный идентификатор модели, например 'gpt-3.5-turbo'
            })
        });

        const { choices } = await response.json();
        const chatGPTResponse = choices[0].message.content;
        displayChatGPTResponse(chatGPTResponse);
    }

    return messengerContent;
}
