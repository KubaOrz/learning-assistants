// src/courses/course.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/services/user.service';
import { Course } from '../model/course.entity';
import { CreateCourseRequest } from '../dto/create-course-request.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    private userService: UserService,
  ) {}

  async createCourse(
    createCourseDto: CreateCourseRequest,
    authorId: number,
  ): Promise<Course> {
    const { title, shortDescription, thumbnail, longDescription } =
      createCourseDto;
    const author = await this.userService.findUserById(authorId);

    const course = new Course();
    course.title = title;
    course.shortDescription = shortDescription;
    course.thumbnail = thumbnail;
    course.longDescription = longDescription;
    course.author = Promise.resolve(author);

    return await this.courseRepository.save(course);
  }

  async getCourseById(courseId: number): Promise<Course> {
    const course = await this.courseRepository.findOneBy({ id: courseId });
    if (!course) {
      throw new NotFoundException(`Course with id ${courseId} doesn't exist`);
    }
    return course;
  }

  async getCourseWithChaptersById(courseId: number): Promise<Course> {
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
      relations: ['chapters'],
    });
    if (!course) {
      throw new NotFoundException(`Course with id ${courseId} doesn't exist`);
    }
    return course;
  }

  async getCourses(
    page: number = 1,
    limit: number = 10,
  ): Promise<{ courses: Course[]; total: number }> {
    const skip = (page - 1) * limit;

    const [courses, total] = await this.courseRepository.findAndCount({
      take: limit,
      skip: skip,
      order: {
        createdAt: 'DESC',
      },
    });

    return { courses, total };
  }

  async updateCourseDurationInMinutes(
    courseId: number,
    difference: number,
  ): Promise<Course> {
    const course = await this.courseRepository.findOneBy({ id: courseId });
    if (!course) {
      throw new NotFoundException('Course not found!');
    }
    course.totalDurationMinutes += difference;
    const updatedCourse = await this.courseRepository.save(course);
    return updatedCourse;
  }

  async isUserCourseAuthor(userId: number, courseId: number): Promise<boolean> {
    // TODO
    return true;
  }
}
