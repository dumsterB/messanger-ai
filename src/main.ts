import Messenger, { MessangerConfig } from './component/index';

const config: MessangerConfig = {
  holder: 'messenger',
  tools: {}, // Здесь можно указать нужные инструменты
  placeholder: 'Let`s write information about the lesson!',
  title: "Open Ai"
};

const messengerElement = document.createElement('div');
messengerElement.id = config.holder;

document.getElementById('app')!.appendChild(messengerElement);

new Messenger(config);
