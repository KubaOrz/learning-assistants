import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ChapterService } from '../services/chapter.service';
import { Chapter } from '../model/chapter.entity';
import { CreateChapterRequest } from '../dto/create-chapter-request.dto';

@Controller('chapters')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @Post(':courseId')
  async createChapter(@Param('courseId') courseId: number, @Body() createChapterRequest: CreateChapterRequest): Promise<Chapter> {
    return this.chapterService.createChapter(courseId, createChapterRequest);
  }

  @Get(':chapterId')
  async getChapter(@Param('chapterId') chapterId: number) {
    const chapter = await this.chapterService.findChapterById(chapterId);
    return chapter;
  }
}
