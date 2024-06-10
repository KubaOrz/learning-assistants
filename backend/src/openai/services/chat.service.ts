import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from '../model/chat.entity';
import { AuthorType, Message } from '../model/message.entity';
import { UserService } from 'src/user/services/user.service';
import { OpenAIService } from './openai.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    private userService: UserService,
    private openAIService: OpenAIService
  ) {}

  async createNewChat(userId: number, courseId: number): Promise<number> {
    const user = await this.userService.findUserById(userId);
    const assistant = await this.openAIService.getAssistant(courseId);
    const thread = await this.openAIService.createEmptyThread();

    const chat = new Chat();
    chat.assistant = assistant;
    chat.user = user;
    chat.thread = thread.id;

    const savedChat = await this.chatRepository.save(chat);

    return savedChat.id;
  }

  async getChatByID(chatId: string) {
    const chat = await this.chatRepository.findOne({
        where: {
            id: parseInt(chatId)
        },
        relations: ['assistant']
    });

    if (!chat) {
        throw new NotFoundException('Chat not found');
    }

    return chat;
  }

  async saveMessage(content: string, author: AuthorType): Promise<Message> {
    const message = new Message();
    message.content = content;
    message.author = author;
    message.timestamp = new Date();
    return await this.messageRepository.save(message);
  }

  async getMessages(chatId: number): Promise<Message[]> {
    return await this.messageRepository.find({ where: { chat: { id: chatId } } });
  }
}
