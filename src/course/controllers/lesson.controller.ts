// lesson.controller.ts

import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Patch,
} from '@nestjs/common';
import { LessonService } from '../services/lesson.service';
import { CreateLessonRequest } from '../dto/create-lesson-request.dto';
import { Lesson } from '../model/lesson.entity';
import { LessonPatchRequest } from '../dto/lesson-patch-request.dto';

@Controller('lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post(':chapterId')
  async createLesson(
    @Param('chapterId') chapterId: number,
    @Body() lessonData: CreateLessonRequest,
  ): Promise<Lesson> {
    return this.lessonService.createLesson(chapterId, lessonData);
  }

  @Delete(':lessonId')
  @HttpCode(204)
  async deleteLesson(@Param('lessonId') lessonId: number): Promise<void> {
    await this.lessonService.deleteLesson(lessonId);
  }

  @Patch(':lessonId')
  async updateLesson(@Param('lessonId') lessonId: number, @Body() lessonPatchData: LessonPatchRequest): Promise<Partial<Lesson>> {
    const updatedValues = await this.lessonService.updateLesson(lessonId, lessonPatchData);
    return updatedValues;
  }
}
