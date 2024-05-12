import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthenticationData, SignInRequest, UserRegistrationDetails } from './dto/authentication/authentication.types'

export const apiSchema = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000'
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
        })
    })
})

export const { useCreateUserMutation, useSignInMutation } = apiSchema;