//import {io, Socket} from "socket.io-client";
import { dataMessage } from "../types/index";
// export default function sendMessageToChatGPT(message: string): Promise<string> {
//     return new Promise<string>((resolve, reject) => {
//         const socket: Socket = io('https://scumesc.pythonanywhere.com/'); // Подключение к серверу socket.io
//         // Отправка сообщения на сервер
//         socket.emit('userMessage', { message });
//
//         // Ожидание ответа от сервера
//         socket.on('chatGPTResponse', (response: string) => {
//             resolve(response);
//         });
//
//         // Обработка ошибок
//         socket.on('error', (error: any) => {
//             reject(error);
//         });
//     });
// }

async function postMessageChatGPT(data: dataMessage) {
  const response = await fetch(
    "https://scumesc.onrender.com/process_json/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
      body: JSON.stringify({ text: data.message }),
    }
  );

  const result = await response.json();

  return result.response;
}

async function sendMessageToGetPrompts(data: dataMessage) {
  const response = await fetch(
    "https://scumesc.onrender.com/process_json2/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
      body: JSON.stringify({ text: data.message }),
    }
  );

  const result = await response.json();

  return result.response;
}
export { postMessageChatGPT, sendMessageToGetPrompts };
