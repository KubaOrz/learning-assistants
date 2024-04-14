import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, getConnection, getManager } from 'typeorm';
import { CourseService } from './course.service';
import { Chapter } from '../model/chapter.entity';
import { CreateChapterRequest } from '../dto/create-chapter-request.dto';
import { Lesson } from '../model/lesson.entity';

@Injectable()
export class ChapterService {
  constructor(
    @InjectRepository(Chapter)
    private readonly chapterRepository: Repository<Chapter>,
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
    private readonly courseService: CourseService,
    private dataSource: DataSource,
  ) {}

  async createChapter(
    courseId: number,
    createChapterRequest: CreateChapterRequest,
  ): Promise<Chapter> {
    const course = await this.courseService.getCourseById(courseId);

    const newChapter = this.chapterRepository.create({
      title: createChapterRequest.title,
      course: course,
    });

    const savedChapter = await this.chapterRepository.save(newChapter);

    return savedChapter;
  }

  async findChapterById(id: number) {
    const chapter = await this.chapterRepository.findOne({
      where: { id },
      relations: ['lessons'],
    });
    if (!chapter) {
      throw new NotFoundException(`Chapter with id ${id} not found`);
    }
    chapter.calculateTotalDuration();
    return chapter;
  }

  async deleteChapter(chapterId: number): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const chapter = await this.chapterRepository.findOne({
        where: { id: chapterId },
        relations: ['lessons'],
      });

      if (!chapter) {
        throw new NotFoundException(`Chapter with ID ${chapterId} not found`);
      }

      if (chapter.lessons && chapter.lessons.length > 0) {
        await this.lessonRepository.remove(chapter.lessons);
      }

      await this.chapterRepository.remove(chapter);
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Failed to delete chapter');
    } finally {
      queryRunner.release();
    }
  }
}
