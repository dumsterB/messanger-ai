import "./index.css";
import { arrow_right } from "../../utils/icons";
import { Prompt } from "../../types/index";

let prompts:Prompt[] = [];

export function updatePrompts(newPrompts: Prompt[]):void {
  prompts = newPrompts;
}
export default function Tags() {
  if (Array.isArray(prompts) && prompts.length) {
    let content = "";
    prompts.forEach((prompt:Prompt) => {
      content += `
        <div class="tag">
          <button class="tags-button" onclick="setTag(this)">
            <span class="tagTextContent">${prompt}</span>
            <span class="ml-2">${arrow_right}</span>
          </button>
        </div>
      `;
    });
    return content;
  } else {
    return `<div id="tags" class="block">
      <div class="tag">
        <button class="tags-button" onclick="setTag(this)">
          <span class="tagTextContent">How can I help you?</span>
          <span class="ml-2">${arrow_right}</span>
        </button>
      </div>
      <div class="tag">
        <button class="tags-button" onclick="setTag(this)">
          <span class="tagTextContent">How can I help you? 11</span>
          <span class="ml-2">${arrow_right}</span>
        </button>
      </div>
    </div>`;
  }
}
