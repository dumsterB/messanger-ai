//import {io, Socket} from "socket.io-client";

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
export default async function sendMessageToChatGPT(message: string) {
    const response = await fetch('https://scumesc.pythonanywhere.com/process_json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'text': message })
    });

    const result = await response.json();
 
    return result.response
}
