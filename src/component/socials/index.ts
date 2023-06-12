import { Socials } from "../../types/index";
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

export default function SocialMedias(params: Socials[]): string {
    const socials: HTMLDivElement = document.createElement("div");
    if (params && params.length) {
        for (let i = 0; i < params.length; i++) {
            const social_item = document.createElement("div");
            social_item.classList.add("social-item");
            const social_icon = document.createElement("div");
            social_icon.classList.add("social-icon");
            const text = document.createElement("p");
            text.classList.add("social-name");
            text.textContent = params[i].type;
            social_item.appendChild(social_icon);
            social_item.appendChild(text);
            social_icon.innerHTML = components[params[i].type];
            socials.appendChild(social_item);
        }
    }

    let content;
    if (params && params.length) {
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
    } else {
        return `<div></div>`;
    }

    return content;
}
