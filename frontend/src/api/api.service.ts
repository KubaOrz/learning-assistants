import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthenticationData, SignInRequest, UserRegistrationDetails } from './dto/authentication/authentication.types'
import { RootState } from '../redux/store';
import { CoursesResponse } from './dto/courses/courses,types';

export const apiSchema = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).authentication.authData?.accessToken;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
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
        })
    })
})

export const { 
    useCreateUserMutation, 
    useSignInMutation,
    useGetCoursesListQuery
} = apiSchema;