import { Module } from '@nestjs/common';
import { CourseController } from './controllers/course.controller';
import { ChapterController } from './controllers/chapter.controller';
import { LessonController } from './controllers/lesson.controller';
import { CourseService } from './services/course.service';
import { ChapterService } from './services/chapter.service';
import { LessonService } from './services/lesson.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './model/course.entity';
import { Chapter } from './model/chapter.entity';
import { Lesson } from './model/lesson.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Chapter, Lesson]), UserModule],
  controllers: [CourseController, ChapterController, LessonController],
  providers: [CourseService, ChapterService, LessonService],
  exports: [CourseService],
})
export class CourseModule {}
