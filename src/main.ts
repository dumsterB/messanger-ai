import Messenger from "./page";
import { MessangerConfig } from "./types/index.ts";

const config: MessangerConfig = {
  holder: "messenger",
  tools: [], // Здесь можно указать нужные инструменты
  placeholder: "Let`s write information about the lesson!",
  socials: [
    { link: "https://instagram.com/name_of_account", type: "instagram" },
    { link: "https://t.me/name_of_account", type: "telegram" },
    { link: "https://facebook.com/name_of_account", type: "facebook" },
    { link: "https://twitter.com/name_of_account", type: "twitter" }
  ],
  name: "Dumster Ai",
  token: import.meta.env.VITE_TOKEN,
  title: "Open Ai",
};

const messengerElement = document.createElement("div");
messengerElement.id = config.holder || "app";

document.getElementById("app")!.appendChild(messengerElement);
new Messenger(config);
