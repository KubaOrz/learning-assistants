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