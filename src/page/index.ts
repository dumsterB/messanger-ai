import { MessangerConfig } from '../types';
import { messengerContent } from '../component/messanger/index';
import './index.css';
import button_img from '../assets/chat.svg';

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
    messengerButton.innerHTML = `<img class="chat-img" height="40" src="${button_img}"></img>`;

    messengerButton.addEventListener('click', () => {
      const messengerContentElem = document.getElementById('messenger-content');
      if (messengerContentElem.style.display === 'block') {
        messengerContentElem.style.display = 'none';
      } else {
        messengerContentElem.style.display = 'block';
      }
    });

    const closeButton = document.querySelector('.messenger-close');
    closeButton?.addEventListener('click', () => {
      const messengerContentElem = document.getElementById('messenger-content');
      messengerContentElem.style.display = 'none';
    });

    messengerContainer.appendChild(messengerButton);
    messengerContainer.appendChild(messengerContent('fewfewfw'));

    element.appendChild(messengerContainer);
  }
}
