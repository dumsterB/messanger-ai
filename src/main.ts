import Messenger from "./page";
import { MessangerConfig } from "./types/index.ts";

const config: MessangerConfig = {
  holder: "messenger",
  tools: [], // Здесь можно указать нужные инструменты
  socials: [
    { link: "https://instagram.com/name_of_account", type: "instagram" },
    { link: "https://t.me/name_of_account", type: "telegram" },
    { link: "https://facebook.com/name_of_account", type: "facebook" },
    { link: "https://twitter.com/name_of_account", type: "twitter" }
  ],
  name: "Dumster Ai",
  color:'#0097A7',
  header_background: `url(https://code-jvs1.jivosite.com/images/pattern/1.svg)`,
  token: import.meta.env.VITE_TOKEN,
};

const messengerElement = document.createElement("div");
messengerElement.id = config.holder || "app";

document.getElementById("app")!.appendChild(messengerElement);
new Messenger(config);
