import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseService } from './course.service';
import { Chapter } from '../model/chapter.entity';
import { CreateChapterRequest } from '../dto/create-chapter-request.dto';

@Injectable()
export class ChapterService {
  constructor(
    @InjectRepository(Chapter)
    private readonly chapterRepository: Repository<Chapter>,
    private readonly courseService: CourseService,
  ) {}

  async createChapter(courseId: number, createChapterRequest: CreateChapterRequest): Promise<Chapter> {
    const course = await this.courseService.getCourseById(courseId);

    const newChapter = this.chapterRepository.create({
      title: createChapterRequest.title,
      course: course,
    });

    const savedChapter = await this.chapterRepository.save(newChapter);

    return savedChapter;
  }

  async findChapterById(id: number) {
    const chapter = await this.chapterRepository.findOneBy({ id });
    if (!chapter) {
      throw new NotFoundException(`Chapter with id ${id} not found`);
    }
    return chapter;
  }
}
