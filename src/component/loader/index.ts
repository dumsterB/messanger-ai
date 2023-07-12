import "./index.css";
export default function Loader(value: boolean) {
  let content = "";
  if (value) {
    content = `
      <div class="loader">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;
  }
  return content;
}
