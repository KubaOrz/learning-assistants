import {
    Controller,
    Post,
    Body,
    ValidationPipe,
    UseGuards,
    HttpCode,
    Get,
    Query,
    Param,
  } from '@nestjs/common';
  import { ApiTags } from '@nestjs/swagger';
import { OpenAIService } from '../services/openai.service';
  
  @Controller('openai')
  @ApiTags('OpenAI')
  export class OpenAIController {
    constructor(private readonly openaiService: OpenAIService) {}

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
  }
  