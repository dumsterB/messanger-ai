import './index.css';
import avatar from '../../assets/avatar.jpg'
export function messengerContent(params): HTMLDivElement {
    const messengerContent = document.createElement('div');
    messengerContent.id = 'messenger-content';
    messengerContent.classList.add('messenger-content');

    messengerContent.innerHTML = `
    <div class="messenger-header bg-gray-500 flex justify-between">
    <div class=" w-full h-12 flex justify-between">
      <div class="flex items-center">
     <img class="w-12 h-12 rounded-full" src="${avatar}" alt="Rounded avatar">
      <span class="messenger-title text-white font-bold ml-2">${params.name || 'Admin'}</span>
      </div>
    
      <button class="messenger-close text-white" onclick="closeMessenger()">&times;</button>
   </div>
  
    </div>
    <div class="messenger-body p-4">
      <p>This is the messenger content.</p>
      <input type="text" id="message-input" class="w-full mt-4 p-2 border border-gray-300 rounded" placeholder="Type your message here">
      <button id="send-button" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Send</button>
      <div id="message-output" class="mt-4"></div>
    </div>
  `;

    return messengerContent;
}
