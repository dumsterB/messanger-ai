import "./index.css";
import { arrow_right } from "../../utils/icons";

export default function Tags() {
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
