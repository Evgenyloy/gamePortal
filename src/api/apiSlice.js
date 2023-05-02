import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: ['news', 'mmo'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://mmo-games.p.rapidapi.com',
    headers: {
      'X-RapidAPI-Key': '91b58b67a8msh2bd4b616724fea5p1339a3jsn28cd7698ccec',
      'X-RapidAPI-Host': 'mmo-games.p.rapidapi.com',
    },
  }),
  endpoints: (builder) => ({
    getNewsList: builder.query({
      query: () => `/latestnews`,

      providesTags: ['news'],
    }),
    getMmoGames: builder.query({
      query: () => '/games?category=mmorpg',

      providesTags: ['mmo'],
    }),
  }),
});

export const { useGetNewsListQuery, useGetMmoGamesQuery } = apiSlice;
