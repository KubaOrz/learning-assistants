import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CourseService } from './course.service';
import { Chapter } from '../model/chapter.entity';
import { CreateChapterRequest } from '../dto/create-chapter-request.dto';
import { Lesson } from '../model/lesson.entity';

@Injectable()
export class ChapterService {
  constructor(
    @InjectRepository(Chapter)
    private readonly chapterRepository: Repository<Chapter>,
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

    return chapter;
  }

  async deleteChapter(chapterId: number): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const chapter = await this.chapterRepository.findOne({
        where: { id: chapterId },
        relations: ['lessons', 'course'],
      });

      if (!chapter) {
        throw new NotFoundException(`Chapter with ID ${chapterId} not found`);
      }

      if (chapter.lessons && chapter.lessons.length > 0) {
        await queryRunner.manager.remove(Lesson, chapter.lessons);
      }

      await queryRunner.manager.remove(Chapter, chapter);

      await this.courseService.updateCourseDurationInMinutes(
        chapter.course.id,
        -chapter.totalDurationMinutes,
      );
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Failed to delete chapter');
    } finally {
      queryRunner.release();
    }
  }

  async updateDurationMinutes(
    chapterId: number,
    difference: number,
  ): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const chapter = await this.chapterRepository.findOne({
        where: { id: chapterId },
        relations: ['course'],
      });
      if (!chapter) {
        throw new NotFoundException('Chapter not found');
      }

      chapter.totalDurationMinutes += difference;

      const updatedChapter = await queryRunner.manager.save(Chapter, chapter);
      const course = await this.courseService.updateCourseDurationInMinutes(
        chapter.course.id,
        difference,
      );

      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Failed to set chapter duration');
    } finally {
      await queryRunner.release();
    }
  }
}
