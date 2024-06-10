import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ChatService } from '../services/chat.service';
import { AuthorType } from '../model/message.entity';
import { OpenAIService } from '../services/openai.service';

type IncomingMessageType = {
    message: string;
    author: AuthorType;
    chatId: string;
}

@WebSocketGateway({ cors: true })
export class ChatGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('ChatGateway');

    constructor(
        private readonly chatService: ChatService,
        private readonly openAIService: OpenAIService
    ) { }

    @SubscribeMessage('joinChatRoom')
    async handleJoinChatRoom(client: Socket, roomId: string) {
        client.join(roomId);
        this.logger.log(`Client ${client.id} joined chat room ${roomId}`);
    }

    @SubscribeMessage('sendMessage')
    async handleSendMessage(client: Socket, payload: IncomingMessageType) {
        const { message, author, chatId } = payload;

        const savedUserMessage = await this.chatService.saveMessage(message, author);
        this.server.to(chatId).emit('receiveMessage', savedUserMessage);

        const chat = await this.chatService.getChatByID(chatId);
        await this.openAIService.addMessageToThread(chat.thread, message);
        const runStream = await this.openAIService.createRunStream(chat.assistant.openaiId, chat.thread);

        for await (const event of runStream) {
            if (event.event === 'thread.message.completed') {
                const data = event.data;
                // @ts-ignore
                const messageContent = data.content[0].text;
                const citationRegex = /\[*?\]/g;
                messageContent.value = messageContent.value.replace(citationRegex, '');
                console.log(messageContent.value);
                const savedAssistantMessage = await this.chatService.saveMessage(messageContent.value, "ASSISTANT");
                this.server.to(chatId).emit('receiveMessage', savedAssistantMessage);
            }
        }
    }

    afterInit(server: Server) {
        this.logger.log('Init');
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client connected: ${client.id}`);
    }
}
