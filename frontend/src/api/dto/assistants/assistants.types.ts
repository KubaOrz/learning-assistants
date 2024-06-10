import { Course } from "../courses/courses.types";

export type Assistant = {
  id: number;
  openaiId: string;
  name: string;
  enabled: boolean;
  course: Course;
}
