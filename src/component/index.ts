import './index.css'

export interface MessangerConfig {
  holder: string;
  tools: any;
  placeholder: string;
  title: string;
}

export default class Messenger {
  constructor(config: MessangerConfig) {
    this.initializeMessenger(config);
  }

  initializeMessenger(config: MessangerConfig) {
    const element = document.getElementById(config.holder);
    if (!element) {
      console.error(`Element with ID ${config.holder} not found.`);
      return;
    }

    const messengerContainer = document.createElement('div');
    messengerContainer.classList.add('messenger-container');

    const messengerButton = document.createElement('button');
    messengerButton.classList.add('messenger-button');
    messengerButton.innerHTML = 'Open Messenger';

    const messengerContent = document.createElement('div');
    messengerContent.classList.add('messenger-content');
    messengerContent.innerHTML = `
      <div class="messenger-header">
        <span class="messenger-title">${config.title || 'Ai Chat'}</span>
        <button class="messenger-close">&times;</button>
      </div>
      <div class="messenger-body">
        <p>This is the messenger content.</p>
      </div>
    `;

    messengerButton.addEventListener('click', () => {
      messengerContent.style.display = 'block';
    });

    const closeButton = messengerContent.querySelector('.messenger-close');
    closeButton?.addEventListener('click', () => {
      messengerContent.style.display = 'none';
    });

    messengerContainer.appendChild(messengerButton);
    messengerContainer.appendChild(messengerContent);

    element.appendChild(messengerContainer);
  }
}
