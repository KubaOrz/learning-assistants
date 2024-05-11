// lesson.service.ts

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from '../model/lesson.entity';
import { ChapterService } from './chapter.service';
import { CreateLessonRequest } from '../dto/create-lesson-request.dto';
import { LessonPatchRequest } from '../dto/lesson-patch-request.dto';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
    private chapterService: ChapterService,
  ) {}

  async createLesson(
    chapterId: number,
    lessonData: CreateLessonRequest,
  ): Promise<Lesson> {
    const chapter = await this.chapterService.findChapterById(chapterId);

    const newLesson = this.lessonRepository.create({
      ...lessonData,
      chapter: chapter,
    });

    const createdLesson = await this.lessonRepository.save(newLesson);

    await this.chapterService.updateDurationMinutes(
      createdLesson.chapter.id,
      createdLesson.durationMinutes,
    );
    return createdLesson;
  }

  async deleteLesson(lessonId: number): Promise<void> {
    const lessonToRemove = await this.lessonRepository.findOne({
      where: { id: lessonId },
      relations: ['chapter'],
    });

    if (!lessonToRemove) {
      throw new BadRequestException(`Lesson with id ${lessonId} not found`);
    }

    await this.chapterService.updateDurationMinutes(
      lessonToRemove.chapter.id,
      -lessonToRemove.durationMinutes,
    );

    await this.lessonRepository.remove(lessonToRemove);
  }

  async updateLesson(
    lessonId: number,
    lessonPatchData: LessonPatchRequest,
  ): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOneBy({ id: lessonId });

    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${lessonId} not found`);
    }

    if (lessonPatchData.title) {
      lesson.title = lessonPatchData.title;
    }
    if (lessonPatchData.videoUrl) {
      lesson.videoUrl = lessonPatchData.videoUrl;
    }
    if (lessonPatchData.content) {
      lesson.content = lessonPatchData.content;
    }
    if (lessonPatchData.durationMinutes) {
      const durationDifference =
        lessonPatchData.durationMinutes - lesson.durationMinutes;
      lesson.durationMinutes = lessonPatchData.durationMinutes;
      await this.chapterService.updateDurationMinutes(
        lesson.chapter.id,
        durationDifference,
      );
    }
    if (lessonPatchData.lessonNumber) {
      lesson.lessonNumber = lessonPatchData.lessonNumber;
    }

    return await this.lessonRepository.save(lesson);
  }
}
