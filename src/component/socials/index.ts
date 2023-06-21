import { MessangerConfig } from "../../types/index";
import {
  instagram,
  telegram,
  message,
  support,
  twitter,
  facebook,
} from "../../utils/icons";
import "./index.css";

interface ComponentMap {
  [key: string]: string;
}

const components: ComponentMap = {
  instagram,
  telegram,
  message,
  support,
  twitter,
  facebook,
};

export default function SocialMedias(params: MessangerConfig): string {
  const socials: HTMLDivElement = document.createElement("div");
  if (params.socials && params.socials.length) {
    params.socials.forEach((social) => {
      const social_item = document.createElement("a");
      social_item.setAttribute("href", social.link);
      social_item.setAttribute("target", "_blank");
      social_item.classList.add("social-item");

      const social_icon = document.createElement("div");
      social_icon.classList.add("social-icon");
      social_icon.style.background = params?.color || "";

      const text = document.createElement("p");
      text.classList.add("social-name");
      text.textContent = social.type;

      social_item.appendChild(social_icon);
      social_item.appendChild(text);
      social_icon.innerHTML = components[social.type];

      socials.appendChild(social_item);
    });
  }

  let content = "";

  if (params.socials && params.socials.length) {
    content = `
    <div>
      <div class="pt-1">
        <div class="grid grid-cols-5 gap-1 socials flex mt-2 border-b-2">
           ${socials.innerHTML}
         </div>   
        </div>
      </div>
    </div>
  `;
  }

  return content;
}
