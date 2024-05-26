// lesson.controller.ts

import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Patch,
  Put,
  Get,
} from '@nestjs/common';
import { LessonService } from '../services/lesson.service';
import { CreateLessonRequest } from '../dto/create-lesson-request.dto';
import { Lesson } from '../model/lesson.entity';
import { LessonPatchRequest } from '../dto/lesson-patch-request.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateLessonOrderDTO } from '../dto/update-lesson-order.dto';

@Controller('lessons')
@ApiTags('Lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post(':chapterId')
  async createLesson(
    @Param('chapterId') chapterId: number,
    @Body() lessonData: CreateLessonRequest,
  ): Promise<Partial<Lesson>> {
    return this.lessonService.createLesson(chapterId, lessonData);
  }

  @Get(':lessonId')
  async getLessonById(@Param('lessonId') lessonId: number): Promise<Lesson> {
    return this.lessonService.getLessonById(lessonId);
  }

  @Delete(':lessonId')
  @HttpCode(204)
  async deleteLesson(@Param('lessonId') lessonId: number): Promise<void> {
    await this.lessonService.deleteLesson(lessonId);
  }

  @Patch(':lessonId')
  async updateLesson(
    @Param('lessonId') lessonId: number,
    @Body() lessonPatchData: LessonPatchRequest,
  ): Promise<Partial<Lesson>> {
    const updatedValues = await this.lessonService.updateLesson(
      lessonId,
      lessonPatchData,
    );
    return updatedValues;
  }

  @Put('/order')
  async updateLessonOrder(@Body('lessonIds') lessonIds: UpdateLessonOrderDTO): Promise<void> {
    await this.lessonService.updateLessonOrder(lessonIds);
  }
}
