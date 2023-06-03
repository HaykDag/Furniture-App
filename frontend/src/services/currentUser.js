import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const currentUserApi = createApi({
    reducerPath: 'currentUserApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/user' }),
    tagTypes: ['CurrentUser'],
    endpoints: (builder) => ({
        getCurrentUser: builder.query({
          query: () => `/verify`,
          credentials: 'include',
          providesTags:['CurrentUser']
        }),
        
    })
})

export const { 
    useGetCurrentUserQuery

 } = currentUserApi;