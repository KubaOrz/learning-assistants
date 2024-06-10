import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/course/model/course.entity';
import { Assistant } from './model/assistant.entity';
import { OpenAIController } from './controllers/openai.controller';
import { OpenAIService } from './services/openai.service';
import { ConfigModule } from '@nestjs/config';
import { CourseService } from 'src/course/services/course.service';
import { CourseModule } from 'src/course/course.module';
import { Chat } from './model/chat.entity';
import { Message } from './model/message.entity';
import { ChatService } from './services/chat.service';
import { ChatGateway } from './controllers/chat.gateway';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Assistant, Course, Chat, Message]),
        ConfigModule,
        CourseModule,
        UserModule
    ],
    controllers: [OpenAIController],
    providers: [OpenAIService, ChatService, ChatGateway],
})
export class OpenaiModule { }
