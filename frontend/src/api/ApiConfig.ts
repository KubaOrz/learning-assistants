import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RegistrationResponse, UserRegistrationDetails } from './dto/registration/registration.types'

export const apiSchema = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000'
    }),
    endpoints: (builder) => ({
        createUser: builder.mutation<RegistrationResponse, UserRegistrationDetails>({
            query: (body) => ({
                url: '/auth/register',
                method: 'POST',
                body
            })
        })
    })
})

export const { useCreateUserMutation } = apiSchema;