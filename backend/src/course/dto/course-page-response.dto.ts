import { Course } from '../model/course.entity';

export class CoursePageResponse {
  readonly courses: Course[];
  readonly total: number;
}
