// lesson.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from '../model/lesson.entity';
import { ChapterService } from './chapter.service';
import { CreateLessonRequest } from '../dto/create-lesson-request.dto';


@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
    private chapterService: ChapterService
  ) {}

  async createLesson(chapterId: number, lessonData: CreateLessonRequest): Promise<Lesson> {
    const chapter = await this.chapterService.findChapterById(chapterId);

    const newLesson = this.lessonRepository.create({
      ...lessonData,
      chapter: chapter,
    });

    return await this.lessonRepository.save(newLesson);
  }
}
