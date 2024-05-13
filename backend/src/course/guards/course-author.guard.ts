// guards/course-author.guard.ts

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import AuthRequest from 'src/common/auth-request.type';
import { CourseService } from '../services/course.service';

@Injectable()
export class CourseAuthorGuard implements CanActivate {
  constructor(
    private readonly courseService: CourseService,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    const courseId = +request.params.courseId;

    if (!courseId) {
      throw new UnauthorizedException('Course ID is missing in the request');
    }

    const userId = +request.user.id;

    const isCourseAuthor = await this.courseService.isUserCourseAuthor(
      userId,
      courseId,
    );

    if (!isCourseAuthor) {
      throw new UnauthorizedException(
        'You are not authorized to perform this action on the course',
      );
    }

    return true;
  }
}
