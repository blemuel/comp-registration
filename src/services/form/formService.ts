import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const formApi = createApi({
  reducerPath: 'formApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/',
  }),
  endpoints: (builder) => ({
    sendForm: builder.query({
      query: () => ({
        url: 'api/form/send-form',
        method: 'POST',
      }),
    }),
  }),
})

export const { useSendFormQuery } = formApi
