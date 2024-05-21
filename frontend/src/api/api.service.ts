import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthenticationData, SignInRequest, UserRegistrationDetails } from './dto/authentication/authentication.types'
import { Course, CoursesResponse, CreateCourseDTO } from './dto/courses/courses.types';

export const apiSchema = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
        prepareHeaders: (headers, { getState }) => {
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
            })
        }),
        createNewCourse: builder.mutation<Course, CreateCourseDTO>({
            query: (createCourseDTO) => ({
                url: '/courses',
                method: 'POST',
                body: createCourseDTO
            })
        })
    })
})

export const {
    useCreateUserMutation,
    useSignInMutation,
    useGetCoursesListQuery,
    useCreateNewCourseMutation,
    useGetCoursesByAuthorQuery
} = apiSchema;