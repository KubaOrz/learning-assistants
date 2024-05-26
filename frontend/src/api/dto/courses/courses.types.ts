export type Course = {
    id: number;
    title: string;
    shortDescription: string;
    thumbnail: string;
    createdAt: string;
    updatedAt: string;
    longDescription: string;
    totalDurationMinutes: number;
}

export type CoursesResponse = {
    courses: Course[];
    total: number;
}

export type CreateCourseDTO = {
    title: string;
    thumbnail: string;
    shortDescription: string;
    longDescription: string;
}

export type ChapterBase = {
    id: number;
    title: string;
    totalDurationMinutes: number;
}

export type Chapter = ChapterBase & {
    lessons: Lesson[];
}

export type NewChapterDTO = {
    title: string;
    courseId: number;
}

export type Lesson = LessonBase & {
    id: number;
}

export type NewLessonDTO = {
    chapterId: number;
    LessonData: LessonBase
}

export type LessonBase = {
    title: string;
    durationMinutes: number;
    videoUrl: string;
    content: string;
    lessonNumber: number;
}

export type CourseDetails = Course & {
    chapters: Chapter[];
}

export type UpdateLessonOrderDTO = {
    lessonIds: {
        id: number;
        lessonNumber: number;
    }[]
}

export type UpdateLessonDTO = {
    lessonId: number;
    lessonData: Partial<LessonBase>;
}