import {io, Socket} from "socket.io-client";

export default function sendMessageToChatGPT(message: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const socket: Socket = io('http://localhost:3000'); // Подключение к серверу socket.io
        // Отправка сообщения на сервер
        socket.emit('userMessage', { message });

        // Ожидание ответа от сервера
        socket.on('chatGPTResponse', (response: string) => {
            resolve(response);
        });

        // Обработка ошибок
        socket.on('error', (error: any) => {
            reject(error);
        });
    });
}
