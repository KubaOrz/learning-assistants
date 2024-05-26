import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthenticationData, SignInRequest, UserRegistrationDetails } from './dto/authentication/authentication.types'
import { ChapterBase, Course, CourseDetails, CoursesResponse, CreateCourseDTO, Lesson, NewChapterDTO, NewLessonDTO, UpdateLessonDTO, UpdateLessonOrderDTO } from './dto/courses/courses.types';

export const apiSchema = createApi({
    reducerPath: 'api',
    tagTypes: ['CourseDetails', 'LessonDetails'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
        prepareHeaders: (headers) => {
            const authData = sessionStorage.getItem('las_auth');
            if (authData) {
                const token = JSON.parse(authData).accessToken;
                if (token) {
                    headers.set('Authorization', `Bearer ${token}`);
                }
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        createUser: builder.mutation<AuthenticationData, UserRegistrationDetails>({
            query: (body) => ({
                url: '/auth/register',
                method: 'POST',
                body
            })
        }),

        signIn: builder.mutation<AuthenticationData, SignInRequest>({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                body
            })
        }),

        getCoursesList: builder.query<CoursesResponse, void>({
            query: () => ({
                url: '/courses'
            })
        }),

        getCoursesByAuthor: builder.query<CoursesResponse, void>({
            query: () => ({
                url: `/courses/author/all`
            }),
        }),

        createNewCourse: builder.mutation<Course, CreateCourseDTO>({
            query: (createCourseDTO) => ({
                url: '/courses',
                method: 'POST',
                body: createCourseDTO
            })
        }),

        getCourseDetails: builder.query<CourseDetails, number>({
            query: (courseId) => ({
                url: `/courses/${courseId}/details`
            }),
            providesTags: ['CourseDetails']
        }),

        createEmptyChapter: builder.mutation<ChapterBase, NewChapterDTO>({
            query: (newChapterDTO) => ({
                url: `chapters/${newChapterDTO.courseId}`,
                method: 'POST',
                body: {
                    title: newChapterDTO.title
                }
            }),
            invalidatesTags: ['CourseDetails']
        }),

        createNewLesson: builder.mutation<Lesson, NewLessonDTO>({
            query: (NewLessonDTO) => ({
                url: `lessons/${NewLessonDTO.chapterId}`,
                method: 'POST',
                body: NewLessonDTO.LessonData
            }),
            invalidatesTags: ['CourseDetails']
        }),

        updateLessonsOrder: builder.mutation<void, UpdateLessonOrderDTO>({
            query: (lessonIds) => ({
                url: `lessons/order`,
                method: 'PUT',
                body: {
                    lessonIds
                }
            }),
            invalidatesTags: ['CourseDetails']
        }),

        getLessonById: builder.query<Lesson, number>({
            query: (lessonId) => ({
                url: `lessons/${lessonId}`
            }),
            providesTags: ['LessonDetails']
        }),

        updateLesson: builder.mutation<Lesson, UpdateLessonDTO>({
            query: ({ lessonId, lessonData }) => ({
                url: `lessons/${lessonId}`,
                method: 'PATCH',
                body: lessonData
            }),
            invalidatesTags: ['LessonDetails', 'CourseDetails']
        }),

        updateBasicCourseInfo: builder.mutation<Course, { courseId: number, courseData: CreateCourseDTO }>({
            query: ({ courseId, courseData }) => ({
                url: `courses/${courseId}`,
                method: 'PUT',
                body: courseData
            }),
            invalidatesTags: ['CourseDetails']
        }),

        deleteLesson: builder.mutation<void, number>({
            query: (lessonId) => ({
                url: `lessons/${lessonId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['CourseDetails']
        }),

        deleteChapter: builder.mutation<void, number>({
            query: (chapterId) => ({
                url: `chapters/${chapterId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['CourseDetails']
        })
    })
})

export const {
    useCreateUserMutation,
    useSignInMutation,
    useGetCoursesListQuery,
    useCreateNewCourseMutation,
    useGetCoursesByAuthorQuery,
    useCreateEmptyChapterMutation,
    useCreateNewLessonMutation,
    useLazyGetCourseDetailsQuery,
    useGetCourseDetailsQuery,
    useUpdateLessonsOrderMutation,
    useLazyGetLessonByIdQuery,
    useUpdateLessonMutation,
    useUpdateBasicCourseInfoMutation,
    useDeleteLessonMutation,
    useDeleteChapterMutation
} = apiSchema;