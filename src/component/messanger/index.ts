export function messengerContent(params): HTMLDivElement {
    console.log(params)
    const messengerContent = document.createElement('div');
    messengerContent.id = 'messenger-content';
    messengerContent.classList.add('messenger-content');
    messengerContent.innerHTML = `
    <div class="messenger-header bg-gray-500 flex items-center justify-between">
      <span class="messenger-title text-white">Ai Chat</span>
      <button class="messenger-close text-white">&times;</button>
    </div>
    <div class="messenger-body p-4">
      <div class="messenger-body p-4">
        <p>This is the messenger content.</p>
        <input type="text" id="message-input" class="w-full mt-4 p-2 border border-gray-300 rounded" placeholder="Type your message here">
        <button id="send-button" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Send</button>
        <div id="message-output" class="mt-4"></div>
      </div>
    </div>
  `;

    return messengerContent;
}
