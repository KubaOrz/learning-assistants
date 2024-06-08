import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/course/model/course.entity';
import { Assistant } from './model/assistant.entity';
import { OpenAIController } from './controllers/openai.controller';
import { OpenAIService } from './services/openai.service';
import { ConfigModule } from '@nestjs/config';
import { CourseService } from 'src/course/services/course.service';
import { CourseModule } from 'src/course/course.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Assistant, Course]),
        ConfigModule,
        CourseModule
    ],
    controllers: [OpenAIController],
    providers: [OpenAIService],
})
export class OpenaiModule { }
