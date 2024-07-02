import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setTokens } from './authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: "http://127.0.0.1:8000/api/",
  tagTypes: ["Cart"],
  prepareHeaders: async (headers) => {
    let token = localStorage.getItem('access');
    const refresh = localStorage.getItem('refresh');
    if (token) {
      const timestamp = localStorage.getItem('timestamp');
      const now = new Date().getTime();
      if (timestamp) {
        const expiry = parseInt(timestamp);
        if (expiry < now) {
          try {
            const response = await fetch("http://127.0.0.1:8000/api/auth/token/refresh/", {
              method: 'POST',
              body: JSON.stringify({ refresh }),
              headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            token = data.access;
            localStorage.setItem('access', data.access);
            localStorage.setItem('refresh', data.refresh);
            localStorage.setItem('timestamp', `${now + 5 * 60 * 1000}`);
          } catch (error) {
            console.error('Error refreshing token:', error);
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            localStorage.removeItem('timestamp');
          }
        }
      }
    }
    headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: 'auth/register',
        method: 'POST',
        body: credentials,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/token/',
        method: 'POST',
        body: credentials,
      }),
    }),
    refresh: builder.mutation({
      query: () => ({
        url: 'auth/refresh/',
        method: 'POST',
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const result = await queryFulfilled;
          dispatch(setTokens(result));
        } catch (error) {
          console.error('Failed to refresh token', error);
        }
      },
    }),

    addToCart: builder.mutation({
      query: ({ productId, action }) => ({
        url: `user/cart/${productId}/add-to-cart/`,
        method: 'POST',
        body: { action },
      }),
      invalidatesTags: ['Cart']
    }),

    getCart: builder.query({
      query: () => ({
        url: 'user/cart/',
        method: 'GET',
      }),
      providesTags: ["Cart"]
    }),

    removeFromCart: builder.mutation({
      query: ({ productId }) => ({
        url: `user/cart/${productId}/remove-to-cart/`,
        method: 'POST',
      }),
      invalidatesTags: ['Cart']
    }),

    buyCart: builder.mutation({
      query: () => ({
        url: 'user/cart/buy-cart/',
        method: 'POST',
      }),
      invalidatesTags: ['Cart', 'History'],
    }),

    getUserHistory: builder.query({
      query: () => ({
        url: 'user/history/',
        method: 'GET',
      }),
      providesTags: ["History"]
    }),

    getGames: builder.query({
      query: ({ search = '', min_price = '', max_price = '', page = 1, page_size = 10 } = {}) => {
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (min_price) params.append('min_price', min_price);
        if (max_price) params.append('max_price', max_price);
        if (page) params.append('page', page);
        if (page_size) params.append('page_size', page_size);
        return `games/?${params.toString()}`;
      },
    }),

    getId: builder.query({
      query: ({ id }) => `games/${id}/`,
    }),

  }),
});

export const { useRegisterMutation, useLoginMutation, useRefreshMutation, useAddToCartMutation, useGetCartQuery, useRemoveFromCartMutation, useBuyCartMutation, useGetUserHistoryQuery, useGetGamesQuery, useGetIdQuery } = authApi;

export default authApi.reducer;
