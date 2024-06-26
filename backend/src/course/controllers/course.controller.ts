import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { CourseService } from '../services/course.service';
import { Course } from '../model/course.entity';
import AuthRequest from 'src/common/auth-request.type';
import { CreateCourseRequest } from '../dto/create-course-request.dto';
import { CoursePageResponse } from '../dto/course-page-response.dto';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@Controller('courses')
@ApiTags('Courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get(':id')
  async getCourse(@Param('id') id: number): Promise<Course> {
    return await this.courseService.getCourseById(id);
  }

  @Get(':id/details')
  async getCourseWithDetails(@Param('id') id: number): Promise<Course> {
    return await this.courseService.getCourseWithChaptersById(id);
  }

  @Get()
  async getCourses(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<CoursePageResponse> {
    return this.courseService.getCourses(page, limit);
  }

  @Get('author/all')
  async getCoursesByAuthor(
    @Req() request: AuthRequest,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<any> {
    const authorId = request.user.id;
    return this.courseService.getCoursesByAuthor(authorId, page, limit);
  }

  @Post()
  async createCourse(
    @Req() request: AuthRequest,
    @Body() createCourseDto: CreateCourseRequest,
  ): Promise<Course> {
    const authorId = request.user.id;
    return await this.courseService.createCourse(createCourseDto, authorId);
  }

  @Put(':id')
  async updateCourse(
    @Param('id') id: number,
    @Body() createCourseDto: CreateCourseRequest,
  ): Promise<Course> {
    return await this.courseService.updateCourse(id, createCourseDto);
  }
}
