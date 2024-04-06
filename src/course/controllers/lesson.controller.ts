// lesson.controller.ts

import { Controller, Post, Body, Param } from '@nestjs/common';
import { LessonService } from '../services/lesson.service';
import { CreateLessonRequest } from '../dto/create-lesson-request.dto';
import { Lesson } from '../model/lesson.entity';


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
}
