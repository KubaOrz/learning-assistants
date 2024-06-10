import {
    Controller,
    Post,
    Get,
    Param,
    Req,
  } from '@nestjs/common';
  import { ApiTags } from '@nestjs/swagger';
import { OpenAIService } from '../services/openai.service';
import AuthRequest from 'src/common/auth-request.type';
import { ChatService } from '../services/chat.service';
import { ChatCreationResponse } from '../dto/chat-creation-response.dto';
  
  @Controller('openai')
  @ApiTags('OpenAI')
  export class OpenAIController {
    constructor(
      private readonly openaiService: OpenAIService,
      private readonly chatService: ChatService
    ) {}

    @Post(':id')
    async createAssistantForCourse(@Param('id') id: number): Promise<void> {
      this.openaiService.enableAssistantsForCourse(id);
    }

    @Post('/disable/:id')
    async disableAssistant(@Param('id') courseId: number) {
      await this.openaiService.disableAssistantsForCourse(courseId);
    }

    @Get('/:id')
    async getAssistant(@Param('id') courseId: number) {
      const assistant = await this.openaiService.getAssistant(courseId);
      return assistant;
    }

    @Post('/chat/create/:assistantId')
    async createChat(@Param('assistantId') assistantId: number, @Req() request: AuthRequest): Promise<ChatCreationResponse> {
      const userId = request.user.id;
      const chatId = await this.chatService.createNewChat(userId, assistantId);
      return {
        chatId
      };
    }
  }
  