import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/user' }),
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        getUsers: builder.query({
          query: () => `/allUsers`,
          providesTags:['Users']
        }),
        
    })
})

export const { 
    useGetUsersQuery,

 } = usersApi;