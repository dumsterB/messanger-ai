import Messenger from "./page";
import { MessangerConfig } from "./types/index.ts";

const config: MessangerConfig = {
  holder: "messenger",
  name: "Dumster Ai",

  header_background: `url(https://code-jvs1.jivosite.com/images/pattern/1.svg)`,
  token: import.meta.env.VITE_TOKEN,
};
// color:'#0097A7',
// request: sendGpt
// async function sendGpt(){
//  const data = await fetch('https://jsonplaceholder.typicode.com/todos/1')
//       .then(response => response.json())
//       .then(json => json)
//       return data.title
// }
const messengerElement = document.createElement("div");
messengerElement.id = config.holder || "app";

document.getElementById("app")!.appendChild(messengerElement);

new Messenger(config);
