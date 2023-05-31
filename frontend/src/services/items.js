import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const itemsApi = createApi({
  reducerPath: 'itemsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/items' }),
  tagTypes: ['Items'],
  endpoints: (builder) => ({
    getItems: builder.query({
      query: () => `/`,
      providesTags:['Items']
    }),
    addItem: builder.mutation({
        query:(body)=>({
            url:'/',
            method: 'POST',
            body,
        }),
        invalidatesTags:["Items"]
    }),
    updateItem: builder.mutation({
        query:({id,...body})=>({
            url:`/${id}`,
            method: 'PATCH',
            body,
        }),
        invalidatesTags:["Items"]
    }),
    deleteItem: builder.mutation({
        query:(id)=>({
            url:`/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags:["Items"]
    })
  }),
})


export const { useGetItemsQuery, 
               useAddItemMutation, 
               useUpdateItemMutation, 
               useDeleteItemMutation
            } = itemsApi;