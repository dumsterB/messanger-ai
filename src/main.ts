import Messenger, { MessangerConfig } from './page';

const config: MessangerConfig = {
  holder: 'messenger',
  tools: {}, // Здесь можно указать нужные инструменты
  placeholder: 'Let`s write information about the lesson!',
  name:'Dumster Ai',
  title: "Open Ai"
};

const messengerElement = document.createElement('div');
messengerElement.id = config.holder;

document.getElementById('app')!.appendChild(messengerElement);

new Messenger(config);
